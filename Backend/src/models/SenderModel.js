

const mongoose = require('mongoose');

// Define sender schema without enum in State and City
const senderSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String, // No enum here, so any city can be saved
        required: true
    },
    State: {
        type: String, // No enum here, so any state can be saved
        required: true
    },
    ParcelsSent: {
        type: Number,
        required: true
    },
    PostCode: {
        type: Number,
        required: true,
        length: 6
    }
}, { timestamps: true });

// Creating the Sender model
const Sender = mongoose.model('Sender', senderSchema);

module.exports = Sender;
