const express = require("express");
const { signup ,login,logout,getname,CarrierStatus} = require("../controllers/UserController.js"); // Adjust this path based on your folder structure
const jwt = require('jsonwebtoken');
const app = express() ;
const router = express.Router();
const passport= require("passport")
const {verifyToken} = require('../utils/jwtutils')
const OAuthController = require('../controllers/OAuthController.js')
const {registerParcel} = require('../controllers/ParcelController.js')

// Define the signup route
router.post("/signup", signup); // This will handle POST requests to /api/signup
router.post("/login",login);
router.post("/logout",verifyToken,logout);
router.post('/parcelregistration',registerParcel);
router.get('/getname',verifyToken,getname);
router.get('/carrierStatus' , verifyToken , CarrierStatus);

module.exports = router;