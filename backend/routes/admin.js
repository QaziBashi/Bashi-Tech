const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { authenticate, authorizeRole } = require("../middleware/auth");
const connectToDB = require("../lib/mongodb");

// POST /api/admin/create - only manager can create admin accounts
router.post(
  "/create",
  authenticate,
  authorizeRole("manager"),
  async (req, res) => {
    try {
      await connectToDB();
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return res.status(400).json({ error: "Missing fields" });
      const existing = await User.findOne({ email });
      if (existing)
        return res.status(409).json({ error: "User already exists" });
      const hashed = await bcrypt.hash(password, 10);
      const admin = new User({ name, email, password: hashed, role: "admin" });
      await admin.save();
      return res
        .status(201)
        .json({
          message: "Admin created",
          email: admin.email,
          role: admin.role,
        });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create admin" });
    }
  }
);

module.exports = router;
