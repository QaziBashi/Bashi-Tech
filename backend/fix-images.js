// Fix product images in database
require('dotenv').config();
const connectToDB = require('./lib/mongodb');
const Product = require('./models/Product');

async function fixProductImages() {
  try {
    await connectToDB();
    
    // Get all products
    const products = await Product.find();
    
    for (const product of products) {
      // Replace blob URLs with proper paths
      if (!product.images || product.images.length === 0) {
        // Add images if missing
        let defaultImage = "/Images/macbook/iPhone-16-Pro.jpg";
        
        if (product.category === 'samsung') {
          defaultImage = "/Images/macbook/REGEN-GalaxyS24Ultra-TitaniumBlack.webp";
        } else if (product.category === 'macbook') {
          defaultImage = "/Images/macbook/mac-1.jpg";
        } else if (product.category === 'ipad') {
          defaultImage = "/Images/macbook/UNIQ-Camden-Case-for-iPad-10th-Gen-2022-10.9-Fossil-Grey.webp";
        } else if (product.category === 'airpods') {
          defaultImage = "/Images/macbook/camera__fmzxyv562aq2_large_2x.jpg";
        }
        
        product.images = [defaultImage];
        await product.save();
        
        console.log(`✅ Added images for: ${product.name}`);
        continue;
      }
      
      const hasBlobImages = product.images.some(img => img && img.includes('blob:'));
      
      if (hasBlobImages) {
        // Set default images based on category
        let defaultImage = "/Images/macbook/iPhone-16-Pro.jpg";
        
        if (product.category === 'samsung') {
          defaultImage = "/Images/macbook/REGEN-GalaxyS24Ultra-TitaniumBlack.webp";
        } else if (product.category === 'macbook') {
          defaultImage = "/Images/macbook/mac-1.jpg";
        } else if (product.category === 'ipad') {
          defaultImage = "/Images/macbook/UNIQ-Camden-Case-for-iPad-10th-Gen-2022-10.9-Fossil-Grey.webp";
        } else if (product.category === 'airpods') {
          defaultImage = "/Images/macbook/camera__fmzxyv562aq2_large_2x.jpg";
        }
        
        product.images = [defaultImage];
        await product.save();
        
        console.log(`✅ Fixed images for: ${product.name}`);
      }
    }
    
    console.log('🎉 All product images have been fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing images:', error);
  } finally {
    process.exit();
  }
}

fixProductImages();