const express = require("express");
const router = express.Router();
const stripe = require("../config/stripe.js");

// Create Payment Intent for Custom Payment Form
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { items, amount, currency = 'usd' } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    // Calculate or use provided amount
    const finalAmount = amount || items.reduce((sum, item) => sum + (item.fullData?.price || item.price) * item.quantity, 0);
    const amountInCents = Math.round(finalAmount * 100);

    console.log("Creating payment intent for amount:", finalAmount);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency,
      payment_method_types: ['card'],
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
      // Add metadata for order tracking
      metadata: {
        items_count: items.length.toString(),
        total_amount: finalAmount.toString(),
        order_source: 'web'
      }
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      amount: finalAmount,
      currency,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error("Payment Intent Creation Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to create payment intent" 
    });
  }
});

module.exports = router;