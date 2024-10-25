const express = require("express");
const { signup ,login,logout} = require("../controllers/UserController.js"); // Adjust this path based on your folder structure
const jwt = require('jsonwebtoken');
const app = express() ;
const router = express.Router();
const passport= require("passport")
const {verifyToken} = require('../utils/jwtutils')
const OAuthController = require('../controllers/OAuthController.js')


// Define the signup route
router.post("/signup", signup); // This will handle POST requests to /api/signup
router.post("/login",login);
router.post("/logout",verifyToken,logout)




module.exports = router;