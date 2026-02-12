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

const app = express();

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

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin-verify", adminVerification);
app.use("/api/products", productRoutes);
app.use("/api", favouriteRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/stripe", stripePaymentIntents);
app.use("/api/orders", orderRoutes);

// ping route
app.get("/api/ping", (req, res) =>
  res.json({ ok: true, time: Date.now() })
);

const port = process.env.PORT || 4000;

// connect DB & start server
connectToDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(
      "Failed to connect to DB (continuing without DB):",
      err.message || err
    );
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  });
