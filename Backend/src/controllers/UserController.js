const user = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtutils.js");


const signup = async (req, res) => {
  let { email, password, name, contactNumber } = req.body;
  console.log("req.body", req.body);

  try {
    // Check if user already exists
    const userExists = await user.findOne({
      $or: [{ email: email }, { contactNumber: contactNumber }]
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(1000 + Math.random() * 9000); 
    // Create a new user instance
    const newUser = new user({
      email,
      password: hashedPassword,
      name,
      contactNumber,
      otp,
    });

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

    return res.status(201).json({
      message: "User created successfully",
      token,
      id: newUser._id, // Send the token in the response
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
      id: loginUser._id,
      token, //a Send the token in the response
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

const CarrierStatus = async (req,res) => {
  //This function is checking that user is Carrier active or inactive 
    try {
      const userId = req.user.id;
      const userRole = await user.findById(userId).select("CarrierStatus");

      if(!userRole){
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ CarrierStatus: userRole.CarrierStatus });
    } catch (error) {
      console.error("Error fetching username:", error);
    res.status(500).json({ message: "Server error" });
    }
};

const UserDetails = async (req,res) =>{
  try {
    const userId = req.user.id;
    const userDetails = await user.findById(userId);

    if(!userDetails){
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error fetching User Details:' , error);
    res.status(500).json({message:"Server error"});
  }
}

const UpdateUserDetails = async(req,res) =>{
  try {
    const userId = req.user.id;
    const { email, aadhaar, profilePicture } = req.body; 

    // Validate input
    if (!email && !aadhaar && !profilePicture) {
      return res.status(400).json({ error: "No data provided for update." });
    }

    // Find user by ID
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({ error: "User not found." });
    }

    if (email) User.email = email;
    if (aadhaar) User.aadhaar = aadhaar;
    if (profilePicture) User.profilePicture = profilePicture;

    // Save updated user data
    await User.save();

    return res
      .status(200)
      .json({ message: "User details updated successfully.", user: User });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

const ForgotPassword = async(req , res) => {
  try {
    const {email , password} = req.body;

    if(!email || !password){
      return res.status(400).json({ error: "Some field is empty" });
    }

    const User = await user.findOne({email:email});
    if(!User){
      return res.status(404).json({ error: "User not found with this Email." });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    User.password = hashedPassword;
    await User.save();

    return res.status(200).json({message:"Password Updated Successfully,"});
  } catch (error) {
    console.error("Error updating Password:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}


module.exports = { signup, login, logout, getname , CarrierStatus , UserDetails , UpdateUserDetails , ForgotPassword};
