const Product = require("../models/Product");
const { uploadFromBase64, deleteImage } = require("../config/cloudinary");

const ALLOWED_CATEGORIES = ["iphone", "samsung", "ipad", "macbook", "airpods"];

const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    
    // Handle image uploads if provided
    if (payload.images && Array.isArray(payload.images)) {
      const uploadedImages = [];
      
      for (const image of payload.images) {
        if (typeof image === 'string') {
          if (image.startsWith('data:image')) {
            // Base64 image - upload to Cloudinary
            const result = await uploadFromBase64(image);
            uploadedImages.push(result.secure_url);
          } else if (image.startsWith('http')) {
            // Already a URL - keep as is
            uploadedImages.push(image);
          }
        }
      }
      
      payload.images = uploadedImages;
    }
    
    const product = new Product(payload);
    await product.save();
    return res.status(201).json({ success: true, product });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({
        success: false,
        error: err.message || "Failed to create product",
      });
  }
};

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      sort = "-createdAt",
      brand,
      minPrice,
      maxPrice,
      category,
      featured,
    } = req.query;
    const filter = {};
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (featured !== undefined) filter.isFeatured = featured === "true";
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
      Product.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      items,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).lean();
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    return res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, error: "Invalid product id" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid category" });
    }
    const items = await Product.find({ category })
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ success: true, items });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch by category" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Handle image updates if provided
    if (updates.images && Array.isArray(updates.images)) {
      const uploadedImages = [];
      
      for (const image of updates.images) {
        if (typeof image === 'string') {
          if (image.startsWith('data:image')) {
            // Base64 image - upload to Cloudinary
            const result = await uploadFromBase64(image);
            uploadedImages.push(result.secure_url);
          } else if (image.startsWith('http')) {
            // Already a URL - keep as is
            uploadedImages.push(image);
          }
        }
      }
      
      updates.images = uploadedImages;
    }
    
    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    return res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({
        success: false,
        error: err.message || "Failed to update product",
      });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    return res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
