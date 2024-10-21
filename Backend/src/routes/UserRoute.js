const express = require("express");
const { signup ,login,logout} = require("../controllers/UserController.js"); // Adjust this path based on your folder structure
const jwt = require('jsonwebtoken');
const app = express() ;
const router = express.Router();
const passport= require("passport")
const {verifyToken} = require('../utils/jwtutils')
const OthController = require('../controllers/OAuthController.js')


app.use(passport.initialize());
app.use(passport.session()) ;

// Define the signup route
router.post("/signup", signup); // This will handle POST requests to /api/signup
router.post("/login",login);
router.post("/logout",verifyToken,logout)

// Google OAuth Route
router.get('/google', passport.authenticate('google',{
  scope:['email','profile']
}));

// Google OAuth Callback Route
router.get('/login/google',
  passport.authenticate('google', {
    failureRedirect: '/signup', // Redirect to signup if user does not exist
  }),
  (req, res) => {
    const { user, token } = req.user; 
    res.cookie('token', token);
    // If successful authentication, redirect to home
    res.redirect('http://localhost:3000/home'); // Redirect to home if user exists
  }
);
router.get('/dashboard');
module.exports = router;