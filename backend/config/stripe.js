const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("✅ Stripe initialized");

module.exports = stripe;
