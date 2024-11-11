// sockets/socketHandler.js
const { setSocket } = require("./socketManager");
const { setupEmitEvents } = require("./emitEvents"); // Import emit events
const { setupOnEvents } = require("./onEvents"); // Import on events

const setupSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        // Set the socket instance
        setSocket(socket,io);
        
        setupOnEvents(); 
        setupEmitEvents()
        // Handle user registration event
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = { setupSocketHandlers };
