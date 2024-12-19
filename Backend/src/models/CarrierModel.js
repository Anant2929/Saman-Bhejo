const mongoose = require('mongoose');

// Define Carrier Schema
const carrierSchema = new mongoose.Schema({
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User schema
        required: true
    },
    carrierAddress: {
        type: String,
        required: true
    },
    carrierCity: {
        type: String,
        required: true
    },
    carrierState: {
        type: String,
        required: true
    },
    carrierPostCode: {
        type: Number,
        required: true,
        length: 6
    },
    carriercarrierPhoto: {
        type: String // URL or path to carrier's photo
    },
    carrierDeliveryMode: {
        type: String,
        enum: ['Bike', 'Car', 'Bus', 'Train', 'Plane','Boat,'], // Modes of travel
        required: true
    },
    carrierVehicle: {
        type: String, // Vehicle details (optional)
    },
    carriertravelDate: {
        type: Date, // Date of travel
        required: true
    },
    carriertravelFromCity: {
        type: String, // Starting city
        required: true
    },
    carriertravelToCity: {
        type: String, // Destination city
        required: true
    }
}, { timestamps: true });

// Creating the carrier model
const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;
