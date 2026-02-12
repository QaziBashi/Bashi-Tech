const express = require("express");
const {
  createCheckoutSession,
  handleWebhook,
  getSession,
} = require("../controllers/stripeController.js");

const router = express.Router();

// Create checkout session
router.post("/create-checkout-session", createCheckoutSession);

// Webhook endpoint - needs raw body for signature verification
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

// Get Stripe session and linked order
router.get("/session/:sessionId", getSession);

module.exports = router;
