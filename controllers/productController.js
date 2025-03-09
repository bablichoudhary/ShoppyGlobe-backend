const Product = require("../models/Product");

// Function to validate if a string is a URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !imageUrl || stock === undefined) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Validate price (must be a positive number)
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ msg: "Price must be a positive number" });
    }

    // Validate image URL format
    if (!isValidUrl(imageUrl)) {
      return res.status(400).json({ msg: "Invalid image URL" });
    }

    // Validate stock (must be a non-negative number)
    if (typeof stock !== "number" || stock < 0) {
      return res
        .status(400)
        .json({ msg: "Stock must be a non-negative number" });
    }

    // Create and save the new product
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      stock,
    });
    await newProduct.save();

    res
      .status(201)
      .json({ msg: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Update Stock
exports.updateStock = async (req, res) => {
  try {
    const { productId, stock } = req.body;

    // Validate required fields
    if (!productId || stock === undefined) {
      return res.status(400).json({ msg: "Product ID and stock are required" });
    }

    // Validate stock (must be a non-negative number)
    if (typeof stock !== "number" || stock < 0) {
      return res
        .status(400)
        .json({ msg: "Stock must be a non-negative number" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Update stock and save changes
    product.stock = stock;
    await product.save();

    res.json({ msg: "Stock updated successfully", product });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
