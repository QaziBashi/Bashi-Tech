"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const connectToDB = require("../lib/mongodb");
const { authenticate } = require("../middleware/auth");

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  try {
    await connectToDB();
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

/* ================= SIGNIN ================= */
router.post("/signin", async (req, res) => {
  try {
    await connectToDB();
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token, role: user.role, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signin failed" });
  }
});

/* ================= USER REQUESTS ADMIN ================= */
router.post("/request-admin", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.role === "admin")
      return res.status(400).json({ error: "Already admin" });
    if (user.adminRequestToken && user.adminRequestExpires > Date.now())
      return res.status(400).json({ error: "Request already pending" });

    const token = crypto.randomBytes(32).toString("hex");

    const approveLink = `${process.env.BACKEND_URL}/api/auth/approve-admin?token=${token}`;
    const rejectLink = `${process.env.BACKEND_URL}/api/auth/reject-admin?token=${token}`;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: "Admin Access Request",
      html: `
        <h2>Admin Access Request</h2>
        <p>User <b>${user.name}</b> (${user.email}) has requested admin access.</p>
        <p>Click below to approve or reject:</p>
        <p>
          <a href="${approveLink}"
             style="display:inline-block;background:#28a745;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;margin-right:10px;">
             ✅ Approve
          </a>
          <a href="${rejectLink}"
             style="display:inline-block;background:#dc3545;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
             ❌ Reject
          </a>
        </p>
        <p style="color:#666;font-size:12px;">This link will expire in 24 hours.</p>
      `,
    });

    user.adminRequestToken = token;
    user.adminRequestExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h
    await user.save();

    res.json({ message: "Admin request sent to owner successfully" });
  } catch (err) {
    console.error("Request admin error:", err);
    res.status(500).json({ error: `Admin request failed: ${err.message}` });
  }
});

/* ================= OWNER APPROVES ADMIN ================= */
router.get("/approve-admin", async (req, res) => {
  try {
    await connectToDB();
    const { token } = req.query;

    if (!token) {
      return res.status(400).send("❌ Invalid Request: No token provided");
    }

    const user = await User.findOne({
      adminRequestToken: token,
      adminRequestExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send(`
        ❌ Invalid or expired link
        <br><br>
        Possible reasons:
        <br>• Link has already been used
        <br>• Link expired (24 hours)
        <br>• Invalid token
      `);
    }

    // Generate activation token
    const activationToken = crypto.randomBytes(32).toString("hex");
    const activationLink = `${process.env.BACKEND_URL}/api/auth/activate-admin?token=${activationToken}`;

    // Send email to USER with activation link
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: "Admin Request Approved ✅",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Admin Request Approved!</h2>
          <p>Hi <strong>${user.name}</strong>,</p>
          <p>Great news! Your admin access request has been approved by the owner.</p>
          <p>Click the button below to activate your admin dashboard:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${activationLink}"
               style="display:inline-block;background:#12aad1;color:white;padding:12px 24px;text-decoration:none;border-radius:5px;font-weight:bold;"
               target="_blank">
               Activate Admin Dashboard
            </a>
          </div>
          <p style="color:#666;font-size:12px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="background:#f5f5f5;padding:10px;border-radius:5px;word-break:break-all;font-size:12px;">
            ${activationLink}
          </p>
        </div>
      `,
    });

    // Mark user as approved
    user.isAdminApproved = true;
    user.adminActivationToken = activationToken;
    user.adminRequestToken = undefined;
    user.adminRequestExpires = undefined;
    await user.save();

    res.send("✅ User approved. Activation email sent.");
  } catch (err) {
    console.error("Approve admin error:", err);
    res.status(500).send("❌ Approval failed");
  }
});

/* ================= OWNER REJECTS ADMIN ================= */
router.get("/reject-admin", async (req, res) => {
  try {
    await connectToDB();
    const { token } = req.query;

    if (!token) {
      return res.status(400).send("❌ Invalid Request: No token provided");
    }

    const user = await User.findOne({
      adminRequestToken: token,
      adminRequestExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("❌ Invalid or expired link");
    }

    // Notify user
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: "Admin Request Rejected",
      html: `
        <h2>Admin Request Rejected</h2>
        <p>Hi ${user.name},</p>
        <p>Unfortunately, your admin access request has been rejected by the owner.</p>
        <p>If you believe this was a mistake, please contact the administrator.</p>
      `,
    });

    // Clear admin request
    user.isAdminApproved = false;
    user.adminRequestToken = undefined;
    user.adminRequestExpires = undefined;
    await user.save();

    res.send("❌ Admin request rejected. User has been notified.");
  } catch (err) {
    console.error("Reject admin error:", err);
    res.status(500).send("❌ Rejection failed");
  }
});

/* ================= USER ACTIVATES ADMIN ================= */

// router.get("/activate-admin", async (req, res) => {
//   try {
//     await connectToDB();
//     const { token } = req.query;

//     if (!token) {
//       return res.status(400).send("❌ Invalid Request: No token provided");
//     }

//     const user = await User.findOne({
//       adminActivationToken: token,
//       isAdminApproved: true,
//     });

//     if (!user) {
//       return res.status(403).send("❌ Invalid or expired activation link");
//     }

//     // Activate admin role
//     user.role = "admin";
//     user.isAdminApproved = false; // Reset approval flag
//     user.adminActivationToken = undefined;
//     await user.save();

//     // Redirect to admin dashboard
//     res.redirect(`${process.env.FRONTEND_URL}/pages/admin-dashboard`);
//   } catch (err) {
//     console.error("Activate admin error:", err);
//     res.status(500).send("❌ Activation failed. Please contact support.");
//   }
// });

// module.exports = router;
/* ================= USER ACTIVATES ADMIN ================= */
router.get("/activate-admin", async (req, res) => {
  try {
    await connectToDB();
    const { token } = req.query;

    if (!token) {
      return res.status(400).send("❌ Invalid Request: No token provided");
    }

    const user = await User.findOne({
      adminActivationToken: token,
      isAdminApproved: true,
    });

    if (!user) {
      return res.status(403).send("❌ Invalid or expired activation link");
    }

    // Activate admin role
    user.role = "admin";
    user.isAdminApproved = false; // Reset approval flag
    user.adminActivationToken = undefined;
    await user.save();

    // ✅ Generate NEW JWT token with updated role
    const newToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" },
    );

    // Redirect to frontend with token in query
    // Frontend can read it and store in localStorage
    res.redirect(
      // `${process.env.FRONTEND_URL}/pages/admin-dashboard?token=${newToken}`,
      `${process.env.FRONTEND_URL}/auth/login?token=${newToken}`,
    );
  } catch (err) {
    console.error("Activate admin error:", err);
    res.status(500).send("❌ Activation failed. Please contact support.");
  }
});

module.exports = router;
