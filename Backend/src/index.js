const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoute"); // Corrected import path
const session = require("express-session")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const oAuthRoutes = require('./routes/oAuthRoute')
const parcelRoutes = require('./routes/ParcelRoute')

dotenv.config();
const passport = require('passport');  


const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Adjust according to your frontend's URL
  credentials: true, // Enable credentials if needed
}));
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// Call the connectDB function to establish a connection
connectDB();
// Set up session middleware
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());



// Route to check if the user is logged in
app.get('/home', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.displayName}!`);
  } else {
    res.redirect('/login');
  }
});

app.use('/oAuth' , oAuthRoutes);
// Use the user routes
app.use("/user", userRoutes); // Prefix all user routes with /api
app.use("/parcel", parcelRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



