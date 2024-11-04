const mongoose = require("mongoose");
const UserSocket = require("../models/SocketIdModel.js");

const onUserRegistration = (socket) => {
    socket.on("userRegistered", async (data) => {
        console.log(`User registered with ID: ${data.id}`);
        
        try {
            // Find user by ID and store socket ID
            const userId = data.id; // Assuming data.id is the user._id
            const socketId = socket.id; // Get the socket ID

            // Create a new entry in the UserSocket collection
            const userSocket = new UserSocket({
                userId,
                socketId
            });

            await userSocket.save();
            console.log(`Socket ID ${socketId} stored for User ID: ${userId}`);
        } catch (error) {
            console.error(`Error storing socket ID for User ID ${data.id}: ${error.message}`);
        }
    });
};

module.exports = {
    onUserRegistration,
    // other exports...
};
