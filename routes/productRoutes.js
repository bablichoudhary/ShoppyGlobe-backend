const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateStock,
} = require("../controllers/productController");

// Route to create a new product
// Expects product details in the request body
router.post("/", createProduct);

// Route to update product stock
// Expects product ID and stock quantity in the request body
router.put("/stock", updateStock);

module.exports = router;
