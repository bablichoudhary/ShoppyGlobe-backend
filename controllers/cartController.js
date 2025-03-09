const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate input fields
    if (!productId || quantity <= 0)
      return res.status(400).json({ msg: "Invalid input" });

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Check if the product is already in the cart
    let cartItem = await Cart.findOne({ user: req.user, product: productId });

    if (cartItem) {
      // If item exists, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If item does not exist, create a new cart entry
      cartItem = new Cart({ user: req.user, product: productId, quantity });
    }

    // Save the cart item
    await cartItem.save();
    res.status(201).json({ msg: "Product added to cart", cartItem });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find and delete the item from the cart
    const cartItem = await Cart.findOneAndDelete({
      user: req.user,
      product: productId,
    });

    // If item not found, return an error response
    if (!cartItem) return res.status(404).json({ msg: "Item not found" });

    res.json({ msg: "Product removed from cart" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
