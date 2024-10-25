const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    // Parcel details
    parcelName: { 
        type: String,
        required: true
    },
    parcelWeight: {
        type: Number,
        required: true
    },
    parcelType: {
        type: String,
        enum: ['Document', 'Clothing', 'Electronics', 'Food', 'Medicines', 'Others'],
        required: true
    },
    parcelDescription: {
        type: String,
        required: true
    },
    parcelPhotoUrl: {
        type: String,
        required: true
    },
    dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    specialHandlingInstructions: {
        type: String, // e.g., fragile, handle with care
    },

    // Sender Information
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderAddress: {
        type: String,
        required: true
    },

    // Receiver Information
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverAddress: {
        type: String,
        required: true
    },

    // Carrier Information
    carrierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carrierVehicle: {
        type: String,
        required: true
    },

    // City details
    fromCity: {
        type: String,
        required: true
    },
    toCity: {
        type: String,
        required: true
    },

    // Tracking and status
    trackingStatus: {
        type: String,
        enum: ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Canceled'],
        default: 'Booked'
    },
    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending' // For Aadhaar or identity verification
    },
    verificationDate: {
        type: Date
    },
    
    // Payment information
    paymentStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Failed'],
        default: 'Pending'
    },
    deliveryCharges: {
        type: Number,
        required: true
    },

    // Date fields
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    expectedDeliveryDate: {
        type: Date,
        required: true
    }
});

// Adding a pre-save hook to update the 'updatedAt' timestamp on changes
parcelSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Creating the Parcel model
const Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;
