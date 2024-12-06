// emitEvents.js
const { setupOnEvents } = require("./onEvents.js");
const { getSocket } = require("./socketManager.js");

const setupEmitEvents = () => {
  const { io } = getSocket();

  const emitReceiverConfirmation = (receiverId,parcelData) => {
    try {
      console.log("In emitReceiverConfirmation");

      // Sabhi connected users ko notification send karna
      io.emit("newParcelNotification", "welcome to india");
      console.log("Notification sent to all users.");
    } catch (error) {
      console.error(`Error sending parcel notification: ${error.message}`);
    }
  };

  return { emitReceiverConfirmation };
};

module.exports = { setupEmitEvents };
