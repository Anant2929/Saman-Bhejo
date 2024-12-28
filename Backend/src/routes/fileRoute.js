const express = require('express');
const router = express.Router();
const upload = require('../middleware/Multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'parcels',
    });

    console.log("in upload router: " , result);

    // Delete temporary file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: result.secure_url 
    });
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    res.status(500).json({ message: 'Failed to upload file.' });
  }
});

module.exports = router;
