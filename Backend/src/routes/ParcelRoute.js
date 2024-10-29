const express = require('express');
const router = express.Router();
const ParcelController = require('../controllers/ParcelController');
const upload = require('../config/multerConfig'); // Import multer config

// Route to handle parcel creation with photo upload
router.post('/register', upload.single('parcelPhoto'), ParcelController.registerParcel);

module.exports = router;
