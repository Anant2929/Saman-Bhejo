const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoute"); // Corrected import path
const session = require("express-session")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const oAuthRoutes = require('./routes/oAuthRoute')


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
// Set up session middleware
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

app.get("/dashboard" , (req,res) => {
  res.send("Hey! , Welcome to the dashboard page");
})


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
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



