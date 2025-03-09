const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Route to register a new user
// Expects user details (name, email, password) in the request body
router.post("/register", registerUser);

// Route to log in an existing user
// Expects email and password in the request body
router.post("/login", loginUser);

module.exports = router;
