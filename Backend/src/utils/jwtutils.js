const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Token expiration in seconds (e.g., 1 day = 24 * 60 * 60)
const tokenExpirationInSeconds = 24 * 60 * 60; // 1 day

// Function to generate a token with an expiration
const generateToken = (user) => {
  console.log("Generating token for userID:", user.id);

  // Use user ID and any other essential details in the payload
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: tokenExpirationInSeconds } // Token expires in 1 day
  );

  return token;
};

// Middleware to verify token from cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Retrieve the token from cookies
  if (!token) {
    return res.status(403).json({ message: "Token is required for access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Store decoded user info (e.g., user ID) in request
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
