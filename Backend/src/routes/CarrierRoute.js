const express = require('express');
const router = express.Router();
const {verifyToken} = require('../utils/jwtutils');
const { CarrierRegister , CarrierDelete } = require('../controllers/CarrierController');
const { ParcelListing,MyParcel } = require('../controllers/ParcelListingController')

router.post('/carrierRegistration' , verifyToken , CarrierRegister);
router.get('/parcelList' ,verifyToken, ParcelListing);
router.delete('/carrierDelete' , verifyToken , CarrierDelete);
router.get('/myParcel', verifyToken  , MyParcel)

module.exports = router;
