const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Import multer config
const {verifyToken} = require('../utils/jwtutils');
const { CarrierRegister } = require('../controllers/CarrierController');
const { ParcelListing } = require('../controllers/ParcelListingController')

router.post('/carrierRegistration' , verifyToken , CarrierRegister);
router.get('/parcelList', verifyToken , ParcelListing);

module.exports = router;
