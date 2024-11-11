// onEvents.js
const { getSocket } = require("./socketManager");
const {setupEmitEvents} = require("./emitEvents.js")
const users = {}; // This will hold online users' socket IDs
const pendingMessages = {}; // This will temporarily store offline messages

 const  setupOnEvents = () =>{
const {socket,io} = getSocket()
const handleUserRegistration = (userId) => {
    console.log("welcome to registration ")
    socket.on("registerUser", (userId) => {
       
        users[userId] = socket.id; // Store user socket ID when they connect
        console.log(`User registered: ${userId} with socket ID: ${socket.id}`);

        // Check for any pending messages for this user
        if (pendingMessages[userId] && pendingMessages[userId].length > 0) {
            pendingMessages[userId].forEach((request) => {
                const {emitReceiverConfirmation } = setupEmitEvents(socket);
  
                emitReceiverConfirmation(receiverId,parcelData)
            });
            // Clear pending messages after sending
            delete pendingMessages[userId];
            console.log(`Pending messages sent to User ID: ${userId}`);
        }
    });
};




return {handleUserRegistration}
}



module.exports = { setupOnEvents };
