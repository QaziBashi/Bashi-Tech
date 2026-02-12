# Cloudinary Setup Guide

## 1. Get Your Cloudinary Credentials

1. Sign up for a free account at [https://cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard → Settings → Account
3. Copy your:
   - Cloud name
   - API Key  
   - API Secret

## 2. Update Your .env File

Replace the placeholder values in your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key  
CLOUDINARY_API_SECRET=your_actual_api_secret
CLOUDINARY_UPLOAD_FOLDER=bashi_products
```

## 3. Available Upload Endpoints

### Upload Single Image (Multipart Form)
```http
POST /api/upload/single
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data

Body: FormData with file field named "image"
```

### Upload Multiple Images (Multipart Form)
```http
POST /api/upload/multiple  
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data

Body: FormData with files field named "images" (max 5 files)
```

### Upload Base64 Image
```http
POST /api/upload/base64
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  "publicId": "optional_custom_name"
}
```

## 4. Updated Product Creation

When creating/updating products, you can now provide:

1. **Cloudinary URLs** (already uploaded images)
2. **Base64 strings** (will be auto-uploaded to Cloudinary)
3. **Mixed arrays** (combination of both)

Example product creation:
```json
{
  "name": "iPhone 15 Pro",
  "brand": "Apple", 
  "category": "iphone",
  "price": 999,
  "images": [
    "https://res.cloudinary.com/your_cloud/image/upload/v1/bashi_products/iphone1.jpg",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
    "https://another-existing-url.com/image.jpg"
  ],
  "stockQuantity": 50
}
```

## 5. Frontend Usage Examples

### Upload from File Input
```javascript
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload/single', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
    body: formData
  });
  
  const result = await response.json();
  return result.imageUrl; // Cloudinary URL
};
```

### Upload Base64 Image
```javascript
const uploadBase64 = async (base64Data) => {
  const response = await fetch('/api/upload/base64', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({
      image: base64Data
    })
  });
  
  const result = await response.json();
  return result.imageUrl;
};
```

## 6. Benefits

✅ **Auto-optimization** - Images are automatically optimized and served via CDN
✅ **Multiple formats** - Automatic format conversion (WebP, AVIF)  
✅ **Responsive** - Dynamic resizing and transformation
✅ **Storage** - No local storage needed
✅ **Performance** - Faster loading times
✅ **Analytics** - Built-in image usage analytics

## 7. Image Transformations

You can now transform images on-the-fly:

```javascript
// Resize to 300x300
const resized = `${cloudinaryUrl}/w_300,h_300/c_fill`

// Crop to square
const squared = `${cloudinaryUrl}/w_400,h_400,c_fill,g_auto`

// Add overlay
const withOverlay = `${cloudinaryUrl}/l_text:Arial_30:Sale/fl_layer_apply,g_south_east,x_10,y_10`
```

Your existing UI code will continue to work - images will just be served from Cloudinary instead of local storage!