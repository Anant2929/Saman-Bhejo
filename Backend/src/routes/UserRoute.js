const express = require("express");
const { signup ,login,logout} = require("../controllers/UserController.js"); // Adjust this path based on your folder structure
const jwt = require('jsonwebtoken');
const app = express() ;
const router = express.Router();
const passport= require("passport")
// const {verifytoken} = require('../utils/jwtutils')
const OthController = require('../controllers/OAuthController.js')


app.use(passport.initialize());
app.use(passport.session()) ;

// Define the signup route
router.post("/signup", signup); // This will handle POST requests to /api/signup
router.post("/login",login);
router.post("/logout",logout)

// Google OAuth Route
router.get('/google', passport.authenticate('google',{
  scope:['email','profile']
}));

// Google OAuth Callback Route
router.get('/login/google',
passport.authenticate('google',{
  successRedirect:'http://localhost:3000/home',
  failureRedirect:'/login'
})
);
router.get('/dashboard');
module.exports = router;