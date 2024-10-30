const mongoose = require('mongoose');

// Define receiver schema without enum in State and City
const receiverSchema = new mongoose.Schema({
    receiver: {
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
    ParcelsReceived: {
        type: Number,
        required : true
    },
    PostCode: {
        type: Number,
        required: true,
        length: 6
    }
}, { timestamps: true });

// Creating the receiver model
const Receiver = mongoose.model('Receiver', receiverSchema);

module.exports = Receiver;
