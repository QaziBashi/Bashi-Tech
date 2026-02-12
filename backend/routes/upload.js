const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { authenticate, authorizeRole } = require("../middleware/auth");

// Upload single image
router.post(
  "/single",
  authenticate,
  authorizeRole("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          error: "No image file provided" 
        });
      }

      res.json({
        success: true,
        imageUrl: req.file.path,
        publicId: req.file.filename,
        message: "Image uploaded successfully"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ 
        success: false, 
        error: "Failed to upload image" 
      });
    }
  }
);

// Upload multiple images
router.post(
  "/multiple",
  authenticate,
  authorizeRole("admin"),
  upload.array("images", 5), // Max 5 images
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: "No image files provided" 
        });
      }

      const uploadedImages = req.files.map(file => ({
        url: file.path,
        publicId: file.filename
      }));

      res.json({
        success: true,
        images: uploadedImages,
        message: `${req.files.length} images uploaded successfully`
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ 
        success: false, 
        error: "Failed to upload images" 
      });
    }
  }
);

// Upload base64 image
router.post(
  "/base64",
  authenticate,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { image, publicId } = req.body;

      if (!image) {
        return res.status(400).json({ 
          success: false, 
          error: "No base64 image provided" 
        });
      }

      if (!image.startsWith('data:image')) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid base64 image format" 
        });
      }

      const { uploadFromBase64 } = require("../config/cloudinary");
      const result = await uploadFromBase64(image, publicId);

      res.json({
        success: true,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        message: "Base64 image uploaded successfully"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ 
        success: false, 
        error: "Failed to upload base64 image" 
      });
    }
  }
);

module.exports = router;