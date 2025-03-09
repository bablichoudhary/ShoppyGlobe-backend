const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

// Route to add an item to the cart
// Protected Route: Requires authentication
// Expects product details in the request body
router.post("/add", authenticateUser, addToCart);

// Route to remove an item from the cart
// Protected Route: Requires authentication
// Expects product ID in the request body or query params
router.delete("/remove", authenticateUser, removeFromCart);

module.exports = router;
