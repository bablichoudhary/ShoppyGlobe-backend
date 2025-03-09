const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header("Authorization");

  // If no token is provided, deny access
  if (!token) return res.status(401).json({ msg: "Access Denied!" });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the user ID in the request object for later use
    req.user = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired token errors
    return res.status(401).json({ msg: "Invalid or Expired Token" });
  }
};

module.exports = authenticateUser;
