const user = require("../models/UserModel.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../utils/jwtutils.js");

const signup = async (req, res) => {
  let { email, password, name, contactNumber } = req.body;

  try {
    // Check if user already exists
    const userExists = await user.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" }); // Change to status(400)
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new user({
      email,
      password: hashedPassword,
      name,
      contactNumber,
    });

    // Save the new user to the database
    await newUser.save();
    const token = generateToken({ id: newUser._id });

    // Send the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Send a response indicating successful signup with the token
    return res.status(201).json({
      message: "User created successfully",
      token, // Send the token in the response
    });
  } catch (error) {
    console.error("Error in signup: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    const loginUser = await user.findOne({ email }); // Use await to wait for the user

    if (!loginUser) {
      return res.status(404).json({ message: "User does not exist" }); // Change status to 404
    }

    // Use await to compare passwords
    const isPasswordValid = await bcrypt.compare(password, loginUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" }); // Change status to 401
    }
    const token = generateToken({ id: loginUser._id });

    // Send the token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Cookie is accessible only by the web server, helps with security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Helps with CSRF protection
      maxAge: 3600000, // Token expiry time in milliseconds (1 hour in this case)
    });
    return res.status(201).json({
      message: "User Login successfully",
      token, // Send the token in the response
    }); // Status 200 for successful login
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// const logout = (req, res, next) => {
//   // Verify the token first
//   const verify = verifyToken(req, res, next);
//   if (!verify) {
//     return res.status(401).json({ message: "Unauthorized. Token is invalid." });
//   }

//   // Clear the cookie where the token is stored
//   res.clearCookie("token"); // Assuming your cookie is named 'token'

//   // Optionally: If you have a blacklist implementation, add the token to it here
//   // For example: blacklist.push(req.cookies.token);

//   return res.status(200).json({ message: "Logout successful" });
// };

const logout = (req, res) => {
  // Verify the token using verifyToken middleware directly
  verifyToken(req, res, () => {
    // If token is valid, proceed to clear the cookie and log the user out
    res.clearCookie("token"); // Assuming your cookie is named 'token'

    // Optionally: Add the token to a blacklist if needed

    return res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = { signup, login, logout };
