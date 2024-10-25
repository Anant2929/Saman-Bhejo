const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (user) => {
  // Use user ID and email or other essential details as payload
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Retrieve the token from request headers

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Store user information in request
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
