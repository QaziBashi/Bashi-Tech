const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const connectToDB = require("../lib/mongodb");

// Verify if user has admin role
// Mounted at /api/admin-verify in server.js, so respond on '/'
router.get("/", async (req, res) => {
  try {
    await connectToDB();

    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ isAdmin: false, error: "No token provided" });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user with admin role
    const user = await User.findOne({
      _id: decoded.id,
      role: { $in: ["admin", "manager"] },
    });

    if (!user) {
      return res
        .status(403)
        .json({ isAdmin: false, error: "Admin privileges required" });
    }

    res.json({
      isAdmin: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ isAdmin: false, error: "Invalid token" });
    }
    res.status(500).json({ isAdmin: false, error: "Server error" });
  }
});

module.exports = router;
