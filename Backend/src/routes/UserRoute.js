const express = require("express");
const { signup , login , logout , getname , CarrierStatus , UserDetails , UpdateUserDetails, ForgotPassword} = require("../controllers/UserController.js");
const router = express.Router();
const {verifyToken} = require('../utils/jwtutils')
const {registerParcel} = require('../controllers/ParcelController.js')

// Define the signup route
router.post("/signup", signup); // This will handle POST requests to /api/signup
router.post("/login",login);
router.post("/logout",verifyToken,logout);
router.post('/parcelregistration',registerParcel);
router.get('/getname',verifyToken,getname);
router.get('/carrierStatus' , verifyToken , CarrierStatus);
router.get('/UserDetails' , verifyToken , UserDetails);
router.put('/UpdateUserDetails' , verifyToken , UpdateUserDetails);
router.put('/forgotPassword' , ForgotPassword);

module.exports = router;