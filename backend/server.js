// const express = require("express");
// const cors = require("cors");
// const connectToDB = require("./lib/mongodb");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // use modular routes
// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");
// const productRoutes = require("./routes/products");

// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/products", productRoutes);

// // lightweight ping route to verify server is up (no DB required)
// app.get("/api/ping", (req, res) => res.json({ ok: true, time: Date.now() }));

// const port = process.env.PORT || 4000;

// // Try to connect to DB but start server regardless so ping works
// connectToDB()
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error(
//       "Failed to connect to DB on startup (continuing without DB):",
//       err.message || err,
//     );
//   })
//   .finally(() => {
//     app.listen(port, () =>
//       console.log(`Backend listening on http://localhost:${port}`),
//     );
//   });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./lib/mongodb");
require("dotenv").config();

const app = express();

// Add CORS
app.use(cors({
  origin: ['https://bashi-tech-production.up.railway.app', 'http://localhost:3000', 'https://localhost:4000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin'],
}));

// Enable CORS for all origins
app.use(
  cors({
    origin: [
      "https://bashi-tech-production.up.railway.app",
      "http://localhost:3000",
      "https://localhost:4000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Origin",
    ],
  }),
);

app.use(cors());
app.use(express.json());

// modular routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const favouriteRoutes = require("./routes/favourite");
const uploadRoutes = require("./routes/upload");
const stripeRoutes = require("./routes/stripeRoutes");
const stripePaymentIntents = require("./routes/stripePaymentIntents");
const orderRoutes = require("./routes/orderRoutes");
const adminVerification = require("./routes/adminVerification");

// ping route
app.get("/api/ping", (req, res) => res.json({ ok: true, time: Date.now() }));

// health check route
app.use("/health", require("./routes/health").call);

// connect DB & start server
connectToDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message || err);
  });
