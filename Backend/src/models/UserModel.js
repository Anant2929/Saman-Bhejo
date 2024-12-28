const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that no two users can have the same email
    trim: true,
    lowercase: true, // Converts email to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
  contactNumber: {
    type: String,
    minlength: 10, // Assuming a minimum length for contact number
    maxlength: 10,
    unique: true, // Assuming a maximum length for contact number
  },
  socketId: {
    type: String,
  },
  CarrierStatus: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
  },
  otp: {
    type: Number,
    required: true, // Set true if OTP is mandatory
    default: null, // Default value for OTP
  },
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;