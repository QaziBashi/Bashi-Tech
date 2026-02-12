const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Headers: ", req.headers);
  console.log("token is: ", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "change-me");
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  if (req.user.role !== role)
    return res.status(403).json({ error: "Forbidden" });
  next();
};

module.exports = { authenticate, authorizeRole };

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // contains id + role
//     next();
//   } catch (error) {
//     return res.status(403).json({ error: "Invalid or expired token" });
//   }
// };

// const authorizeRole = (role) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ error: "Not authenticated" });
//     }

//     if (req.user.role !== role) {
//       return res.status(403).json({ error: "Forbidden" });
//     }

//     next();
//   };
// };

// module.exports = { authenticate, authorizeRole };
