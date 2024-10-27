const express = require('express');
const router = express.Router();
const SendParcelController = require('../controllers/SendParcelController');
const upload = require('../config/multerConfig'); // Import multer config

// Route to handle parcel creation with photo upload
router.post('/register', upload.single('parcelPhoto'), SendParcelController.registerParcel);

module.exports = router;
