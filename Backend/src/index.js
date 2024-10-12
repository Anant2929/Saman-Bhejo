const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoute"); // Corrected import path
const session = require("express-session")
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const passport = require('passport');  
const app = express();
const port = 5000;

app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// Call the connectDB function to establish a connection
connectDB();
// Middleware for session management
app.use(session({
  secret: process.env.JWT_SECRET,  // Use a secret for session management
  resave: false,
  saveUninitialized: true,
}));




// Use the user routes
app.use("/user", userRoutes); // Prefix all user routes with /api
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

