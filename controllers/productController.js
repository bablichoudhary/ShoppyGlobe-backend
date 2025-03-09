const Product = require("../models/Product");

// Function to validate if a string is a valid URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ✅ Create a new product
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

// ✅ Update product stock
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

    // Find the product by ID and update stock
    const product = await Product.findByIdAndUpdate(
      productId,
      { stock },
      { new: true }
    );

    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Stock updated successfully", product });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
// update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct)
      return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
