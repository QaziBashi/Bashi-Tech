require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/bashi-tech",
  allowedCategories: ["iphone", "samsung", "ipad", "macbook", "airpods"],
};
