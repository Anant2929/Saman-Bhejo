const { getSocket } = require("./socketManager");
const Notification = require("../models/NotificationModel.js");

const user = {}; // Stores userId -> socketId mapping
const pendingMessages = {}; // Stores pending messages for offline users

const setupOnEvents = () => {
  const { socket, io } = getSocket();

  const handleUserRegistration = () => {
    console.log("Welcome to registration");

    // Listen for the "registerUser" event
    socket.on("registerUser", ({ id }, callback) => {
      if (!id) {
        console.error("User ID is missing");
        return callback({ success: false, message: "User ID is missing" });
      }

      // Register user and map their socket ID
      user[id] = socket.id;
      console.log("Updated user mapping:", user);

      // Send pending messages if available
      if (pendingMessages[id]) {
        pendingMessages[id].forEach(({ parcelData, senderData, receiverData }) => {
          console.log("Sending pending message:", parcelData, senderData, receiverData);
          socket.emit("newParcelNotification", { parcelData, senderData, receiverData });
        });
      }

      // Acknowledge successful registration
      callback({ success: true, message: "User registered successfully!" });
    });

    // Handle sendParcelNotification event
    socket.on("sendParcelNotification", ({ receiverData, senderData, parcelData }) => {
      if (!receiverData || !senderData || !parcelData) {
        console.error("Sender Data, Receiver Data, and Parcel Data are missing");
        return;
      }

      const { receiver } = receiverData;

      if (user[receiver]) {
        // Send notification to the online user
        io.to(user[receiver]).emit("newParcelNotification", {
          senderData,
          parcelData,
          receiverData,
        });
        console.log("Notification sent to online user:", receiver);
      } else {
        // Queue notification for offline users
        if (!pendingMessages[receiver]) {
          pendingMessages[receiver] = [];
        }
        pendingMessages[receiver].push({ senderData, parcelData, receiverData });
        console.log("Pending message saved for offline user:", receiver);
      }
    });

    // Handle deletePendingMessage event
    socket.on("deletePendingMessage", async ({ id, parcelDataInfo,  receiverDataInfo,senderDataInfo }, callback) => {
      if (!id) {
        console.error("Message ID is missing");
        return callback && callback({ success: false, message: "Message ID is missing" });
      }

      
      if (pendingMessages[id]) {
        // Create notification for deleted message

        try {
          const notification = new Notification({
            parcelId:parcelDataInfo._id,
            senderId: senderDataInfo._id,
            receiverId: receiverDataInfo._id,
          });

          await notification.save();
          console.log("Notification saved:", notification);

          // Delete the pending message
          delete pendingMessages[id];
          console.log(`Pending messages for user ID ${id} successfully deleted.`);
          return callback && callback({ success: true, message: "Pending messages successfully deleted!" });
        } catch (error) {
          console.error("Error saving notification:", error);
          return callback && callback({ success: false, message: "Failed to create notification" });
        }
      } else {
        console.error(`No pending messages found for user ID ${id}`);
        return callback && callback({ success: false, message: "No pending messages found for the provided ID." });
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
      const userId = Object.keys(user).find((key) => user[key] === socket.id);
      if (userId) {
        delete user[userId];
        console.log("Updated user mapping after disconnection:", user);
      }
    });
  };

  return { handleUserRegistration, user };
};

module.exports = { setupOnEvents };
