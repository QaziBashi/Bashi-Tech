const mongoose = require("mongoose");

const IphoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    model: String,
    storage: String,
    color: String,
    description: String,
    stock: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports =
  (mongoose.models && mongoose.models.Iphone) ||
  mongoose.model("Iphone", IphoneSchema);
