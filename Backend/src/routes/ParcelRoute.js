const express = require("express");
const app = express() ;
const router = express.Router();
const {registerParcel} = require('../controllers/SendParcelController.js')

// Define the signup route)
router.post('/register',registerParcel)

module.exports = router;