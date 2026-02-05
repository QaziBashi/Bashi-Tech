const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  stripeSessionId: { type: String },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: "usd" },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled", "failed"],
    default: "pending",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  paidAt: { type: Date },
  // payment method details from Stripe (brand, last4, type)
  paymentMethod: { type: Object, default: null },
  // amount paid (dollars)
  amountPaid: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
