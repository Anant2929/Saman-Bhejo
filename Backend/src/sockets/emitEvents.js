// emitEvents.js
const { setupOnEvents } = require("./onEvents.js");
const users = {}; // This will hold online users' socket IDs
const pendingMessages = {}; // This will temporarily store offline messages
const { getSocket } = require("./socketManager.js");

const setupEmitEvents = () => {
  const { socket, io } = getSocket();
  const emitUserRegistration = (userid) => {
    if (!socket.connected) {
        console.error("Socket is not connected!");
        return;
    }

    console.log('Socket ID:', socket.id);
    console.log("Emitting user registration");

    socket.emit("registerUser", { userid }, (response) => {
        console.log("Response from server:", response);
    });


  };
  const emitReceiverConfirmation = ( receiverId, parcelData) => {
    try {
      console.log("in emitreceiverconfirmation")
        // Check if receiver is online

        if (users[receiverId]) {
            // Send parcel notification directly if receiver is online
            io.to(users[receiverId]).emit("newParcelNotification", { parcelData });
            console.log(`Notification sent to User ID: ${receiverId}`);
        } else {
            // Store the parcel request in pendingMessages if receiver is offline
            if (!pendingMessages[receiverId]) {
                pendingMessages[receiverId] = [];
            }
            pendingMessages[receiverId].push({ parcelData });
            console.log(`Receiver with ID ${receiverId} is offline. Request stored in memory.`);
        }
    } catch (error) {
        console.error(`Error sending parcel request: ${error.message}`);
    }
};
  // Add the method to the exports
  return { emitUserRegistration,emitReceiverConfirmation };
};

module.exports = { setupEmitEvents };
