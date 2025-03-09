const mongoose = require("mongoose");

// Define Product schema
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Product name is mandatory
      trim: true, // Removes extra spaces
    },
    description: {
      type: String,
      required: true, // Product description is mandatory
      trim: true, // Removes extra spaces
    },
    price: {
      type: Number,
      required: true, // Price is mandatory
      min: 0, // Ensures price is non-negative
    },
    imageUrl: {
      type: String,
      required: true, // Image URL is mandatory
      validate: {
        validator: function (v) {
          // Ensures valid image URL format (supports PNG, JPG, JPEG, GIF, WEBP)
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/.test(v);
        },
        message: "Invalid image URL format", // Error message for invalid URLs
      },
    },
    stock: {
      type: Number,
      required: true, // Stock quantity is mandatory
      min: 0, // Ensures stock is non-negative
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Export Product model
module.exports = mongoose.model("Product", ProductSchema);
