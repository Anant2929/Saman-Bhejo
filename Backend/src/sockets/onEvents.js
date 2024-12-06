const { getSocket } = require("./socketManager");

// Object to store the mapping of user IDs to socket IDs
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
        pendingMessages[id].forEach((parcelData) => {
          console.log("parceldata is ",parcelData)
          socket.emit("newParcelNotification", parcelData);
        });
        delete pendingMessages[id]; // Clear pending messages after sending
      }

      // Acknowledge successful registration
      callback({ success: true, message: "User registered successfully!" });
    });

    // Handle sendParcelNotification event
    socket.on("sendParcelNotification", ({ receiverid, parcelData }) => {
      if (!receiverid || !parcelData) {
        console.error("Receiver ID or Parcel Data is missing");
        return;
      }

      if (user[receiverid]) {
        // Send notification to the online user
        io.to(user[receiverid]).emit("newParcelNotification", parcelData);
        console.log("Notification sent to online user:", receiverid);
      } else {
        // Queue notification for offline users
        if (!pendingMessages[receiverid]) {
          pendingMessages[receiverid] = [];
        }
        pendingMessages[receiverid].push(parcelData);
        console.log("Pending message saved for offline user:", receiverid);
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
