const mongoose = require('mongoose');

// Define Carrier Schema
const carrierSchema = new mongoose.Schema({
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User schema
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    PostCode: {
        type: Number,
        required: true,
        length: 6
    },
    carrierPhoto: {
        type: String // URL or path to carrier's photo
    },
    carrierDeliveryMode: {
        type: String,
        enum: ['Bike', 'Car', 'Bus', 'Train', 'Plane'], // Modes of travel
        required: true
    },
    carrierVehicle: {
        type: String, // Vehicle details (optional)
    },
    travelDate: {
        type: Date, // Date of travel
        required: true
    },
    travelFromCity: {
        type: String, // Starting city
        required: true
    },
    travelToCity: {
        type: String, // Destination city
        required: true
    }
}, { timestamps: true });

// Creating the carrier model
const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;
