const Parcel = require('../models/ParcelModel');

const ParcelListing = async(req , res) => {
    try {
        
        
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while listing the parcels",
            error: error.message,
          });
    }
}

module.exports = {ParcelListing};