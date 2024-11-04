const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtutils.js");
const { getSocket } = require("../sockets/socketManager");

const signup = async (req, res) => {
  let { email, password, name, contactNumber } = req.body;
  console.log("req.body", req.body);

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      contactNumber
    });
    console.log("newuser body", newUser);

    // Save the new user to the database
    await newUser.save();

    // Generate and assign a token
    const token = generateToken({ id: newUser._id });

    // Send the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 * 2,
    });

    // Get the connected socket and set socketId in user document
    const socket = getSocket();
    if (socket) {
      newUser.socketId = socket.id; // Assign the socket's ID
      await newUser.save(); // Update the user with the socketId in the database
      console.log(`Socket ID ${socket.id} stored for User ID: ${newUser._id}`);
    } else {
      console.log("Socket not connected, unable to store socket ID.");
    }

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
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 * 1,
     
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

const logout = (req, res) => {
  // Clear the cookie where the token is stored

  res.clearCookie("token"); // Assuming your cookie is named 'token'

  // Optionally: If you have a blacklist implementation, add the token to it here
  // For example: blacklist.push(req.cookies.token);

  return res.status(200).json({ message: "Logout successful" });
};

// GET /api/user/getName - Fetch the user's name based on the JWT token

const getname = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = await user.findById(userId).select("name");

    if (!username) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: username.name }); // Return the username
  } catch (error) {
    console.error("Error fetching username:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login, logout, getname };
