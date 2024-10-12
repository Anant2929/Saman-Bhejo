const user = require("../models/UserModel.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtutils.js");
const signup = async (req, res) => {
  let { email, password, name, contactNumber } = req.body;

  try {
    // Check if user already exists
    const userExists = await user.findOne({ email }); // Correct usage of findOne

    if (userExists) {
      return res.status(201).json({ message: "User already exists" }); // Change to status(200)
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
   const token = generateToken({id : newUser._id});

   // Send the token as a cookie
   res.cookie('token', token, {
    httpOnly: true, // Cookie is accessible only by the web server, helps with security
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Helps with CSRF protection
    // Token expiry time in milliseconds (1 hour in this case)
});
    // Send a response indicating successful signup
    return res.status(201).json({ message: "User created successfully" }); // Changed to 201 for created resource
  } catch (error) {
    console.error("error in signup ", error);
    return res.status(500).json({ message: "Server error" }); // Handle server error
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
   const token = generateToken({id : loginUser._id});

   // Send the token as a cookie
   res.cookie('token', token, {
    httpOnly: true, // Cookie is accessible only by the web server, helps with security
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Helps with CSRF protection
    maxAge: 3600000 // Token expiry time in milliseconds (1 hour in this case)
});
    return res.status(201).json({ message: "User Login successfully" }); // Status 200 for successful login
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login };