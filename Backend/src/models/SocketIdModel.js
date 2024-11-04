const mongoose = require('mongoose');

// UserSocket schema definition
const userSocketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true
    },
    socketId: {
        type: String, // Socket ID as a string
        required: true
    }
});

// Create a model based on the schema
const UserSocket = mongoose.model('UserSocket', userSocketSchema);
module.exports =UserSocket