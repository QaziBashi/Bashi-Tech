// Convert base64 images to Cloudinary URLs
require('dotenv').config();
const connectToDB = require('./lib/mongodb');
const Product = require('./models/Product');
const { uploadFromBase64 } = require('./config/cloudinary');

async function convertBase64ToCloudinary() {
  try {
    await connectToDB();
    
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
      console.log('⚠️  Cloudinary not configured. Using local fallback images instead.');
      await useLocalFallbacks();
      return;
    }
    
    const products = await Product.find();
    
    for (const product of products) {
      if (product.images && product.images.length > 0) {
        const firstImage = product.images[0];
        
        // Check if it's a base64 image
        if (firstImage.startsWith('data:image')) {
          console.log(`📤 Converting ${product.name} to Cloudinary...`);
          
          try {
            // Upload to Cloudinary
            const result = await uploadFromBase64(firstImage, `${product.name.replace(/\s+/g, '_')}`);
            
            // Update product with Cloudinary URL
            product.images = [result.secure_url];
            await product.save();
            
            console.log(`✅ ${product.name} converted: ${result.secure_url}`);
          } catch (error) {
            console.log(`❌ Failed to convert ${product.name}: ${error.message}`);
            
            // Use fallback image
            await setFallbackImage(product);
          }
        }
      }
    }
    
    console.log('🎉 Base64 to Cloudinary conversion complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

async function setFallbackImage(product) {
  let fallbackImage = "/Images/macbook/iPhone-16-Pro.jpg";
  
  if (product.category === 'samsung') {
    fallbackImage = "/Images/macbook/REGEN-GalaxyS24Ultra-TitaniumBlack.webp";
  } else if (product.category === 'macbook') {
    fallbackImage = "/Images/macbook/mac-1.jpg";
  } else if (product.category === 'ipad') {
    fallbackImage = "/Images/macbook/UNIQ-Camden-Case-for-iPad-10th-Gen-2022-10.9-Fossil-Grey.webp";
  } else if (product.category === 'airpods') {
    fallbackImage = "/Images/macbook/camera__fmzxyv562aq2_large_2x.jpg";
  }
  
  product.images = [fallbackImage];
  await product.save();
  console.log(`📁 Set fallback for ${product.name}: ${fallbackImage}`);
}

async function useLocalFallbacks() {
  const products = await Product.find();
  
  for (const product of products) {
    await setFallbackImage(product);
  }
  
  console.log('📁 All products set to use local fallback images');
}

convertBase64ToCloudinary();