// onEvents.js
const { getSocket } = require("./socketManager");
const { setupEmitEvents } = require("./emitEvents.js");
const User = require("../models/UserModel.js");

const setupOnEvents = () => {
    const { socket, io } = getSocket();

    const handleUserRegistration = async () => {
        console.log("Welcome to registration");

        // Listen for the "registerUser" event from client-side
        socket.on("registerUser", async ({ id }, callback) => {
            if (!id) {
                console.log("User ID is missing");
                return callback({ success: false, message: "User ID is missing" });
            }

            try {
                // Query by _id since MongoDB uses _id as the primary key by default
                console.log("Looking up user with ID:", id);
                const user = await User.findOne({ _id: id });

                if (!user) {
                    console.log("User not found");
                    return callback({ success: false, message: "User not found" });
                }

                // Store user socket ID when they connect
                user.socketId = socket.id;
                await user.save(); // Ensure the socket ID is saved to the database
                    console.log("newuser",user._id);
                    console.log("id",id)
                console.log(`User registered: ${id} with socket ID: ${socket.id}`);

                // Respond to client with confirmation
                callback({ success: true, message: "User registered successfully!" });
            } catch (error) {
                console.error("Error during user registration:", error);
                callback({ success: false, message: "An error occurred during registration" });
            }
        });
    };

    return { handleUserRegistration };
};

module.exports = { setupOnEvents };
