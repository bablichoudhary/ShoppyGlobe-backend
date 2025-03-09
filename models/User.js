const mongoose = require("mongoose");

// Define User schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true, // Ensures email is unique
      trim: true, // Removes extra spaces
      lowercase: true, // Converts email to lowercase for consistency
    },
    password: {
      type: String,
      required: true, // Password is mandatory
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Export User model
module.exports = mongoose.model("User", UserSchema);
