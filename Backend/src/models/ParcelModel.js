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
    volume: {
        type: Number,
        required: true
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
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverAddress: {
        type: String,
        required: true
    },

    // Carrier Information
    carrier: {
        type: String,
    },
    carrierVehicle: {
        type: String
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

    distance:{
        type: Number,
        required: true,
        default:0
    },

    // Tracking and status
    trackingStatus: {
        type: String,
        enum: ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Canceled'],
        default: 'Booked'
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
