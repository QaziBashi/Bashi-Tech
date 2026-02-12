// const express = require("express");
// const router = express.Router();
// const { authenticate } = require("../middleware/auth");
// const Product = require("../models/Product");
// const User = require("../models/User");
// const connectToDB = require("../lib/mongodb");

// // Add product to favourites
// router.post("/favourites/:productId", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const { productId } = req.params;
//     const userId = req.user.id;

//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ success: false, error: "Product not found" });
//     }

//     // Check if already in favourites
//     const user = await User.findById(userId);
//     if (user.favourites.some(fav => fav.productId.toString() === productId)) {
//       return res.status(400).json({ success: false, error: "Product already in favourites" });
//     }

//     // Add to favourites with full data
//     user.favourites.push({
//       productId: product._id,
//       fullData: {
//         uuid: product.uuid,
//         name: product.name,
//         brand: product.brand,
//         category: product.category,
//         price: product.price,
//         discount: product.discount,
//         description: product.description,
//         images: product.images,
//         stockQuantity: product.stockQuantity,
//         isFeatured: product.isFeatured,
//         createdAt: product.createdAt,
//         updatedAt: product.updatedAt
//       }
//     });
//     await user.save();

//     res.json({ success: true, message: "Product added to favourites" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to add to favourites" });
//   }
// });

// // Remove product from favourites
// router.delete("/favourites/:productId", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const { productId } = req.params;
//     const userId = req.user.id;

//     const user = await User.findById(userId);
//     user.favourites = user.favourites.filter(fav => fav.productId.toString() !== productId);
//     await user.save();

//     res.json({ success: true, message: "Product removed from favourites" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to remove from favourites" });
//   }
// });

// // Get user's favourites
// router.get("/favourites", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const userId = req.user.id;

//     const user = await User.findById(userId);
//     res.json({ success: true, favourites: user.favourites });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to get favourites" });
//   }
// });

// // Add product to cart
// router.post("/cart/:productId", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const { productId } = req.params;
//     const { quantity = 1 } = req.body;
//     const userId = req.user.id;

//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ success: false, error: "Product not found" });
//     }

//     const user = await User.findById(userId);

//     // Check if product already in cart
//     const existingItem = user.cart.find(item => item.productId.toString() === productId);

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       user.cart.push({
//         productId: product._id,
//         fullData: {
//           uuid: product.uuid,
//           name: product.name,
//           brand: product.brand,
//           category: product.category,
//           price: product.price,
//           discount: product.discount,
//           description: product.description,
//           images: product.images,
//           stockQuantity: product.stockQuantity,
//           isFeatured: product.isFeatured,
//           createdAt: product.createdAt,
//           updatedAt: product.updatedAt
//         },
//         quantity
//       });
//     }

//     await user.save();

//     res.json({ success: true, message: "Product added to cart" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to add to cart" });
//   }
// });

// // Update cart item quantity
// router.put("/cart/:productId", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const { productId } = req.params;
//     const { quantity } = req.body;
//     const userId = req.user.id;

//     if (quantity < 1) {
//       return res.status(400).json({ success: false, error: "Quantity must be at least 1" });
//     }

//     const user = await User.findById(userId);
//     const cartItem = user.cart.find(item => item.productId.toString() === productId);

//     if (!cartItem) {
//       return res.status(404).json({ success: false, error: "Product not found in cart" });
//     }

//     cartItem.quantity = quantity;
//     await user.save();

//     res.json({ success: true, message: "Cart updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to update cart" });
//   }
// });

// // Remove product from cart
// router.delete("/cart/:productId", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const { productId } = req.params;
//     const userId = req.user.id;

//     const user = await User.findById(userId);
//     user.cart = user.cart.filter(item => item.productId.toString() !== productId);
//     await user.save();

//     res.json({ success: true, message: "Product removed from cart" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to remove from cart" });
//   }
// });

// // Get user's cart
// router.get("/cart", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const userId = req.user.id;

//     const user = await User.findById(userId);
//     res.json({ success: true, cart: user.cart });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to get cart" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const Product = require("../models/Product");
const User = require("../models/User");
const connectToDB = require("../lib/mongodb");

// ==================== FAVOURITES ====================

// Add product to favourites
router.post("/favourites/:productId", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const { productId } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });

    const user = await User.findById(userId);
    if (user.favourites.some((fav) => fav.productId.toString() === productId)) {
      return res
        .status(400)
        .json({ success: false, error: "Product already in favourites" });
    }

    user.favourites.push({
      productId: product._id,
      fullData: { ...product.toObject() }, // store full product safely
    });

    await user.save();
    res.json({ success: true, message: "Product added to favourites" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to add to favourites" });
  }
});

// Remove product from favourites
router.delete("/favourites/:productId", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const { productId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    user.favourites = user.favourites.filter(
      (fav) => fav.productId.toString() !== productId,
    );
    await user.save();

    res.json({ success: true, message: "Product removed from favourites" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to remove from favourites" });
  }
});

// Get user's favourites
router.get("/favourites", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const userId = req.user.id;

    const user = await User.findById(userId);
    res.json({ success: true, favourites: user.favourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to get favourites" });
  }
});

// ==================== CART ====================

// Add product to cart
router.post("/cart/:productId", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const { productId } = req.params;
    const { quantity = 1 } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });

    const user = await User.findById(userId);
    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity; // increase quantity if already in cart
    } else {
      user.cart.push({
        productId: product._id,
        fullData: { ...product.toObject() }, // save full product
        quantity,
      });
    }

    await user.save();
    res.json({ success: true, message: "Product added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to add to cart" });
  }
});

// // Update cart item quantity
// router.put("/cart/:productId", authenticate, async (req, res) => {
//   try {
//     await connectToDB();
//     const { productId } = req.params;
//     const { quantity } = req.body;
//     const userId = req.user.id;

//     if (quantity < 1)
//       return res
//         .status(400)
//         .json({ success: false, error: "Quantity must be at least 1" });

//     const user = await User.findById(userId);
//     const cartItem = user.cart.find(
//       (item) => item.productId.toString() === productId,
//     );

//     if (!cartItem)
//       return res
//         .status(404)
//         .json({ success: false, error: "Product not found in cart" });

//     cartItem.quantity = quantity;
//     await user.save();
//     res.json({ success: true, message: "Cart updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to update cart" });
//   }
// });
// Increase cart item quantity
router.patch("/cart/:productId/increase", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const { productId } = req.params;
    const userId = req.user.id;

    const user = await User.findOneAndUpdate(
      { _id: userId, "cart.productId": productId },
      { $inc: { "cart.$.quantity": 1 } },
      { new: true },
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Product not found in cart" });

    res.json({ success: true, message: "Quantity increased", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to update cart" });
  }
});

// Decrease cart item quantity
router.patch("/cart/:productId/decrease", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const { productId } = req.params;
    const userId = req.user.id;

    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        "cart.productId": productId,
        "cart.quantity": { $gt: 1 },
      },
      { $inc: { "cart.$.quantity": -1 } },
      { new: true },
    );

    if (!user)
      return res.status(400).json({
        success: false,
        error: "Quantity cannot be less than 1",
      });

    res.json({ success: true, message: "Quantity decreased", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to update cart" });
  }
});

// Remove product from cart
router.delete("/cart/:productId", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const { productId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId,
    );
    await user.save();

    res.json({ success: true, message: "Product removed from cart" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to remove from cart" });
  }
});

// Get user's cart
router.get("/cart", authenticate, async (req, res) => {
  try {
    await connectToDB();
    const userId = req.user.id;

    const user = await User.findById(userId);
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to get cart" });
  }
});

module.exports = router;
