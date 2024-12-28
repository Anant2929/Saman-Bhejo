const express = require('express');
const router = express.Router();
const upload = require('../middleware/Multer');
const {registerParcel,get_price_distance}= require('../controllers/ParcelController');
const {verifyToken} = require('../utils/jwtutils');
const {parcelsDetails , SpecificParcelDetails} = require('../controllers/ParcelsDetailsController');

// Route to handle parcel creation with photo upload
router.post('/register', upload.single('image'), registerParcel);
router.post('/register', upload.single('image'), registerParcel);
router.post('/getPriceDistance', get_price_distance);
router.get('/parcelsInfo' ,verifyToken, parcelsDetails);
router.get('/parcelsInfo/Specific/:parcelId' , SpecificParcelDetails);

module.exports = router;
