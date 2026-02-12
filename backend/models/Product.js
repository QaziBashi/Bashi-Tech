// const mongoose = require("mongoose");

// const specificationSchema = new mongoose.Schema(
//   {
//     ram: String,
//     storage: String,
//     chipset: String,
//     battery: String,
//     display: String,
//     camera: String,
//     os: String,
//     others: mongoose.Schema.Types.Mixed,
//   },
//   { _id: false },
// );

// const ratingSchema = new mongoose.Schema(
//   {
//     avg: { type: Number, min: 0, max: 5, default: 0 },
//     count: { type: Number, default: 0 },
//   },
//   { _id: false },
// );

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     brand: { type: String, required: true, trim: true },
//     category: {
//       type: String,
//       // required: true,
//       enum: ["iphone", "samsung", "ipad", "macbook", "airpods"],
//     },
//     price: { type: Number, required: true, min: 0 },
//     discount: { type: Number, min: 0, max: 100, default: 0 },
//     description: { type: String },
//     specifications: { type: specificationSchema },
//     images: { type: [String], default: [] },
//     stockQuantity: { type: Number, default: 0, min: 0 },
//     rating: { type: ratingSchema, default: () => ({}) },
//     isFeatured: { type: Boolean, default: false },
//   },
//   { timestamps: true },
// );

// module.exports =
//   (mongoose.models && mongoose.models.Product) ||
//   mongoose.model("Product", productSchema);
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },

    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ["iphone", "samsung", "ipad", "macbook", "airpods"],
    },

    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    description: String,

    images: { type: [String], default: [] },
    stockQuantity: { type: Number, default: 0, min: 0 },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
