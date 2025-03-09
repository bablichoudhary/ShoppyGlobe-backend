const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateStock,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controllers/productController");

// Route to create a new product
// Expects product details in the request body
router.post("/", createProduct);

// Route to update product stock
// Expects product ID and stock quantity in the request body
router.put("/stock", updateStock);

// Route to get all products
router.get("/", getAllProducts);

// Route to get a single product by ID
router.get("/:id", getProductById);
// Route to Update Product by ID
router.put("/:id", updateProduct);

module.exports = router;
