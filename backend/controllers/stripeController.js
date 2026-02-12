const stripe = require("../config/stripe.js");

// Create Stripe Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const { items, orderId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    console.log("Creating Stripe session for items:", items);

    // Convert prices to cents for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.fullData?.name || item.name,
          images: item.fullData?.images || [],
        },
        unit_amount: Math.round((item.fullData?.price || item.price) * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL || process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || process.env.FRONTEND_URL}/payment-cancelled`,
      metadata: {
        orderId: orderId.toString(),
      },
    });

    // Persist the Stripe session id on the associated order so we can look it up before webhook triggers
    try {
      const Order = require("../models/Order");
      await Order.findOneAndUpdate(
        { orderId },
        { stripeSessionId: session.id },
        { new: true },
      );
    } catch (attachErr) {
      console.error("Failed to attach stripeSessionId to order:", attachErr);
      // Not fatal for creating the session — continue
    }

    // Return client secret for EmbeddedCheckout and URL for redirect
    res.json({ 
      clientSecret: session.client_secret,
      url: session.url, 
      sessionId: session.id 
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Handle Stripe Webhook
const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Try to fetch payment method details from the PaymentIntent (if present)
      let paymentMethodData = null;
      try {
        if (session.payment_intent) {
          const pi = await stripe.paymentIntents.retrieve(
            session.payment_intent,
            { expand: ["payment_method"] },
          );
          const pm = pi.payment_method;
          if (pm) {
            paymentMethodData = {
              id: pm.id,
              type: pm.type,
              brand: pm.card?.brand || null,
              last4: pm.card?.last4 || null,
            };
          }
        }
      } catch (pmErr) {
        console.error(
          "Failed to retrieve PaymentIntent/payment method:",
          pmErr,
        );
      }

      // Update order status in database
      const Order = require("../models/Order");

      const updatePayload = {
        status: "paid",
        paidAt: new Date(),
        stripeSessionId: session.id,
      };

      if (paymentMethodData) updatePayload.paymentMethod = paymentMethodData;
      // store amountPaid if available (convert cents to dollars)
      if (typeof session.amount_total !== "undefined")
        updatePayload.amountPaid = session.amount_total / 100;

      await Order.findOneAndUpdate(
        {
          $or: [
            { stripeSessionId: session.id },
            { _id: session.metadata.orderId },
            { orderId: session.metadata.orderId },
          ],
        },
        updatePayload,
        { new: true },
      );

      console.log(`Payment successful for order ${session.metadata.orderId}`);
    } catch (dbError) {
      console.error("Failed to update order:", dbError);
      // Don't return error to Stripe - webhook was processed
    }
  }

  res.json({ received: true });
};

// Retrieve Stripe session and linked order
const getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId)
      return res.status(400).json({ error: "Session ID required" });

    // retrieve session and expand the payment method if available
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.payment_method"],
    });

    const Order = require("../models/Order");
    let order = null;

    if (session.metadata && session.metadata.orderId) {
      order = await Order.findOne({ orderId: session.metadata.orderId }).lean();
    }

    if (!order) {
      order = await Order.findOne({ stripeSessionId: session.id }).lean();
    }

    // extract payment method details if expanded
    let paymentMethod = null;
    if (session.payment_intent && session.payment_intent.payment_method) {
      const pm = session.payment_intent.payment_method;
      paymentMethod = {
        id: pm.id,
        type: pm.type,
        brand: pm.card?.brand || null,
        last4: pm.card?.last4 || null,
      };
    }

    res.json({ success: true, session, order, paymentMethod });
  } catch (error) {
    console.error("Failed to get session:", error);
    res.status(500).json({ error: "Failed to get session" });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getSession,
};
