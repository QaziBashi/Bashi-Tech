// # Railway Backend Stabilization

// ## Step 1: Add Health Check Endpoint
const express = require("express");
const router = express.Router();

// Health check endpoint - for monitoring
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: "1.0.1",
  });
});

module.exports = router;
