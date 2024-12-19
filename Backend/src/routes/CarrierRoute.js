const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Import multer config
const {verifyToken} = require('../utils/jwtutils');
const { CarrierRegister } = require('../controllers/CarrierController');
const {ParcelListingController} = require('../controllers/ParcelListingController')

Router.post('/carrierRegistration' , verifyToken , CarrierRegister);
Router.get('/parcelList', ParcelListingController);

module.exports = router;
