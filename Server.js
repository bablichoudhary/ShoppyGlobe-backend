require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // import express
const mongoose = require("mongoose"); //import mongoose
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); //import routes
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticateUser = require("./middleware/auth");

const app = express();

// Middleware
// Parse incoming JSON requests
app.use(express.json());
// Enable Cross-Origin Resource Sharing
app.use(cors());

// Define server port and MongoDB URI from environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shoppyglobe";

// Connect to MongoDB database
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define API routes
app.use("/api/auth", authRoutes); // Authentication routes (login, register, etc.)
app.use("/api/products", productRoutes); // Product-related routes (CRUD operations)
app.use("/api/cart", authenticateUser, cartRoutes); // Cart-related routes (requires authentication)

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to ShoppyGlobe API");
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
