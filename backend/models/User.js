const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin", "manager"], default: "user" },

    /* ===== ADMIN APPROVAL FIELDS ===== */
    adminRequestToken: { type: String, select: false }, // Token for owner approval
    adminRequestExpires: { type: Date, select: false }, // Expiration of request
    isAdminApproved: { type: Boolean, default: false, select: false }, // Owner approved?
    adminActivationToken: { type: String, select: false }, // Token sent to user after owner approves

    /* ===== PASSWORD RESET ===== */
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },

    /* ===== FAVOURITES & CART ===== */
    favourites: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      fullData: {
        uuid: String,
        name: String,
        brand: String,
        category: String,
        price: Number,
        discount: Number,
        description: String,
        images: [String],
        stockQuantity: Number,
        isFeatured: Boolean,
        createdAt: Date,
        updatedAt: Date
      }
    }],
    cart: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      fullData: {
        uuid: String,
        name: String,
        brand: String,
        category: String,
        price: Number,
        discount: Number,
        description: String,
        images: [String],
        stockQuantity: Number,
        isFeatured: Boolean,
        createdAt: Date,
        updatedAt: Date
      },
      quantity: { type: Number, default: 1, min: 1 }
    }],
  },
  { timestamps: true },
);

module.exports =
  mongoose.models && mongoose.models.User
    ? mongoose.models.User
    : mongoose.model("User", userSchema);