const express = require('express');
const router = express.Router();
const {registerParcel,get_price_distance}= require('../controllers/ParcelController');
const upload = require('../config/multerConfig'); // Import multer config
const {verifyToken} = require('../utils/jwtutils');
const {parcelsDetails , SpecificParcelDetails} = require('../controllers/ParcelsDetailsController');

// Route to handle parcel creation with photo upload
router.post('/register', upload.single('parcelPhoto'), registerParcel);
router.post('/getPriceDistance', upload.single('parcelPhoto'), get_price_distance);
router.get('/parcelsInfo' ,verifyToken, parcelsDetails);
router.get('/parcelsInfo/Specific/:parcelId' , SpecificParcelDetails);

module.exports = router;
