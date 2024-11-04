// sockets/socketHandler.js
const { onUserRegistration } = require("./onEvents");
const { setSocket } = require("./socketManager");

const setupSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        // Set the socket instance
        setSocket(socket);

        // Handle user registration event
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = { setupSocketHandlers };
