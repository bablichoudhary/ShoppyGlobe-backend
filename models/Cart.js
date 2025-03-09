const mongoose = require("mongoose");

// Define Cart schema
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
      index: true, // Improves query performance for user-based lookups
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // References the Product model
      required: true,
      index: true, // Improves query performance for product-based lookups
    },
    quantity: {
      type: Number,
      required: true, // Quantity is mandatory
      min: 1, // Ensures at least one product is added to the cart
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Ensure uniqueness of cart items per user (a user can only have one entry per product)
CartSchema.index({ user: 1, product: 1 }, { unique: true });

// Export Cart model
module.exports = mongoose.model("Cart", CartSchema);
