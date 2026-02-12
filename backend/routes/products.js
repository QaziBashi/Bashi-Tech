const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const { authenticate, authorizeRole } = require("../middleware/auth");

// Public routes
router.get("/", controller.getProducts);
router.get("/category/:category", controller.getProductsByCategory);
router.get("/:id", controller.getProductById);

// Admin protected routes
router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  controller.createProduct,
);
router.put(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  controller.updateProduct,
);
router.delete(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  controller.deleteProduct,
);

module.exports = router;
// kjkjk
