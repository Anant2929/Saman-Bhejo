const { getSocket } = require("./socketManager");
const Notification = require("../models/NotificationModel.js");
const ParcelSchema = require("../models/ParcelModel.js");
const SenderSchema = require("../models/SenderModel.js");
const ReceiverSchema = require("../models/ReceiverModel.js");
const CarrierSchema= require("../models/CarrierModel.js");
const User = require("../models/UserModel.js")
const user = {}; // Stores userId -> socketId mapping
const pendingMessages = {}; // Stores pending messages for offline users
const senderMessages = {} ; 
const otpMessages = {}

const setupOnEvents = () => {

  const { socket, io } = getSocket();

  const handleUserRegistration = () => {
    // Listen for the "registerUser" event
    socket.on("registerUser", ({ id }, callback) => {
      if (!id) {
        console.error("User ID is missing");
        return callback({ success: false, message: "User ID is missing" });
      }

      // Register user and map their socket ID
      user[id] = socket.id;
      // console.log("Updated user mapping:", user);

      // Send pending messages if available
      if (pendingMessages[id]) {
        pendingMessages[id].forEach(({ parcelData, senderData, receiverData }) => {
          console.log("Sending pending message:", parcelData, senderData, receiverData);
          io.to(user[id]).emit("newParcelNotification", { parcelData, senderData, receiverData });
        });
      }
      if(senderMessages[id]){
        senderMessages[id].forEach(({notification}) =>{
          console.log("Sending pending message to sender:")
          io.to(user[id]).emit("receiverUpdateParcelStatus", {
          notification
          });
        });
      }
     
      if(otpMessages[id]){
        otpMessages[id].forEach(({otp}) =>{
          console.log("Sending otp message to ")
          io.to(user[id]).emit("CarrierParcelAcceptionNotification", {
            success: true,
            otp,
            message: "A carrier has accepted the parcel being sent to you.",
          });
        
      })
    }
      // Acknowledge successful registration
      callback({ success: true, message: "User registered successfully!" });
    });

    // Handle sendParcelNotification event
    socket.on("sendParcelNotification", async ({ receiverData, senderData, parcelData }) => {

      if (!receiverData || !senderData || !parcelData) {
        console.error("Sender Data, Receiver Data, and Parcel Data are missing");
        return;
      }

      const { receiver } = receiverData;
      const { _id } = parcelData;
      const { sender } = senderData;

      console.log("parcelID, sender, receiver", _id, sender, receiver);

      try {
        const notification = new Notification({
          parcelId: _id,
          senderId: sender,
          receiverId: receiver,
          status: "pending",
          notificationType : "action",
          handlingStatus: false,
          message :"You got a new Parcel"
        });

        await notification.save();

        console.log("Notification saved to the database");

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
      } catch (error) {
        console.error("Error handling notification:", error);
      }
    });

    // Handle deletePendingMessage event
    socket.on("deletePendingMessage", async ({ id, notificationType }, callback) => {
      if (!id) {
        console.error("Message ID is missing");
        return callback && callback({ success: false, message: "Message ID is missing" });
      }
    
      try {
        // Check the notification type and handle accordingly
        if (notificationType === "parcel") {
          if (pendingMessages[id]) {
            delete pendingMessages[id];
            console.log(`Pending messages for user ID ${id} successfully deleted.`);
            return callback && callback({ success: true, message: "Pending messages successfully deleted!" });
          } else {
            console.error(`No pending messages found for user ID ${id}`);
            return callback && callback({ success: false, message: "No pending messages found for the provided ID." });
          }
        } else if (notificationType === "response") {
            if(senderMessages[id]){
              delete senderMessages[id]
              console.log(`Pending messages for user ID ${id} successfully deleted.`);
            } 
          // If notificationType is "response", send a response message
          console.log(`Sending response message for user ID ${id}`);
          // Example response notification
    
          return callback && callback({ success: true, message: "Response message sent!" });
        } else {
          console.error(`Unknown notification type: ${notificationType}`);
          return callback && callback({ success: false, message: "Invalid notification type." });
        }
      } catch (error) {
        console.error("Error deleting or sending message:", error);
        return callback && callback({ success: false, message: "Failed to process the message." });
      }
    });
    
    socket.on("updateParcelStatus", async ({ pID, action, notificationId }, callback) => {
      try {
        console.log("notificationId", notificationId);
    
        // Dynamically set tracking status based on action
        const trackingStatus = action === "Accept" ? "Receiver Accepted" : "Receiver Rejected";
    
        // Update the tracking status in the database
        const updatedParcel = await ParcelSchema.findOneAndUpdate(
          { _id: pID },
          { trackingStatus },
          { new: true } // Return the updated document
        );
    
        const notificationDocument = await Notification.findById(notificationId);
        console.log("Notification document found:", notificationDocument);
    
        if (notificationDocument) {
          const updateHandlingStatus = await Notification.findOneAndUpdate(
            { _id: notificationId },
            { handlingStatus: true },
            { new: true }
          );
          console.log("Updated Handling Status:", updateHandlingStatus);
        } else {
          console.log("No document found with notificationId:", notificationId);
        }
    
        let sender = updatedParcel.receiverDetails;
        let receiver = updatedParcel.senderDetails;
        const responseNotification = new Notification({
          parcelId: pID, // Corrected _id to pID
          senderId: sender,
          receiverId: receiver,
          status: "pending",
          notificationType: "response",
          handlingStatus: true,
          message : "Receiver Confirmed the parcel"
        });
        await responseNotification.save();
    
        // Notify the sender about the receiver's decision
        if (user[receiver]) {
          // Sender is online, send real-time notification
          io.to(user[receiver]).emit("receiverUpdateParcelStatus", {
            notification: responseNotification,
          });
          console.log(`Notification sent to sender (online): ${sender}`);
        } else {
          // Sender is offline, save the notification in senderMessages array
          if (!senderMessages[receiver]) {
            senderMessages[receiver] = [];
          }
          senderMessages[receiver].push({
            notification: responseNotification,
          });
          console.log(`Notification saved for receiver (offline): ${receiver}`);
        }
    
        // Emit confirmation to the client who triggered the status update
        callback({ success: true, parcelId: pID });
      } catch (error) {
        console.error("Error updating parcel status:", error);
    
        // Emit error response
        callback({ success: false, error: "Failed to update parcel status." });
      }
    });
    
    



    socket.on("fetchAllNotifications", async ({ id }, callback) => {
      
      try {
        // Fetch notifications where the user is either a sender or a receiver
        const notifications = await Notification.find({
            receiverId: id 
        });

        // Respond with the notifications array
        callback({
          success: true,
          notifications,
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
        callback({
          success: false,
          message: "An error occurred while fetching notifications.",
        });
      }
    });
    

    socket.on("fetchParcelData", async ({ parcelId }, callback) => {
      console.log(" i am feych parceldata")
      try {
        // Fetch parcel data
        const parcelData = await ParcelSchema.findOne(parcelId);
        const receiverData = await ReceiverSchema.findOne({ parcelsReceived: parcelId });
        const senderData= await SenderSchema.findOne({ parcelsSent: parcelId });
    
        // Check if data exists
        if (!parcelData || !receiverData || !senderData) {
          return callback({
            success: false,
            error: "Some data could not be found for the provided parcelId.",
          });
        }
    
        // Send success response
        callback({
          success: true,
          data: {
            parcelData: parcelData,
            receiverData: receiverData,
            senderData: senderData,
          },
        });
      } catch (error) {
        console.error("Error fetching parcel data:", error);
    
        // Send error response
        callback({
          success: false,
          error: "An error occurred while fetching parcel data.",
        });
      }
    });
    



    socket.on("changeNotificationStatus", async (data, callback) => {
     let { notificationId } = data;
      console.log("notification id",notificationId)
    
      try {
        // Update the notification status in the database

        console.log("notification id",notificationId)
        const updatedNotification = await Notification.findOneAndUpdate(
          { _id : notificationId }, // Match notification by its ID
          { status: "read" }, // Update status to "read"
          { new: true } // Return the updated document
        );
    
        if (updatedNotification) {
          console.log(`Notification status updated to 'read':`, updatedNotification);
    
          // Send success response to the client
          callback({ success: true, parcelId: updatedNotification._id });
        } else {
          console.error("Notification not found.");
          callback({ success: false, error: "Notification not found !!!." });
        }
      } catch (error) {
        console.error("Error updating notification status:", error);
    
        // Send error response to the client
        callback({ success: false, error: "Failed to update notification status." });
      }
    });


    const normalizeDate = (date) => {
      const d = new Date(date); // Input date
      return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
        .toISOString()
        .split("T")[0]; // Sirf date part le lo
    };
/// otp sending code
socket.on("carrierConfirmedParcel", async ({ parcelId, id }) => {
  try {
    // Find the parcel by its ID
    const parcel = await ParcelSchema.findById(parcelId);

    if (!parcel) {
      console.log("Parcel not found");
      return;
    }

    // Update the parcel's carrier details and tracking status
    parcel.carrierDetails = id;
    parcel.trackingStatus = "Carrier Accepted Parcel";
    await parcel.save();

    console.log("Parcel updated successfully with carrier ID:", id);

    // Find the carrier and update their parcel details
    let {fromCity , toCity , expectedDeliveryDate} = parcel ;
        const normalizedate = normalizeDate(expectedDeliveryDate);

    const carrier = await CarrierSchema.findOne({
      _id : id,
      carriertravelFromCity:fromCity,
      carriertravelToCity: toCity,
      carriertravelDate : {$lte :normalizedate },
      
    });
    if (!carrier) {
      console.log("Carrier not found");
      return;
    }

    carrier.parcelId = parcelId;
    await carrier.save();
    console.log("carrier is,",carrier)
    console.log(" parcl is", parcel)



    // Fetch sender and receiver OTPs
    const senderOtp = await User.findOne({ _id: parcel.senderDetails }).select('otp');
    const receiverOtp = await User.findOne({ _id: parcel.receiverDetails }).select('otp');

    console.log("otp is sender , receiver", senderOtp,receiverOtp)
    // Notify the sender
    const responseNotification = new Notification({
      parcelId: parcelId,
      senderId: id,
      receiverId: parcel.senderDetails,
      status: "pending",
      notificationType: "carrier response",
      message : "A carrier has accepted the parcel being sent to you",
      handlingStatus: true,
    });
    await responseNotification.save();

    if (parcel.senderDetails && user[parcel.senderDetails]) {
      io.to(user[parcel.senderDetails]).emit("CarrierParcelAcceptionNotification", {
        success: true,
        otp: senderOtp,
        message: "Your parcel has been accepted by a carrier.",
      });

      io.to(user[parcel.senderDetails]).emit("receiverUpdateParcelStatus", {
        notification: responseNotification,
      });
    } else {
      if (!otpMessages[parcel.senderDetails]) {
        otpMessages[parcel.senderDetails] = [];
      }
      otpMessages[parcel.senderDetails].push({otp : senderOtp });
      if (!senderMessages[parcel.senderDetails]) {
        senderMessages[parcel.senderDetails] = [];
      }
      senderMessages[parcel.senderDetails].push({ notification: responseNotification });
      console.log("Pending message saved for offline sender:", parcel.senderDetails);
    }

    // Notify the receiver
    const receiverNotification = new Notification({
      parcelId: parcelId,
      senderId: id,
      receiverId: parcel.receiverDetails,
      status: "pending",
      notificationType: "carrier response",
      handlingStatus: true,
      message : "A carrier has accepted the parcel being sent to you"
    });
    await receiverNotification.save();

    if (parcel.receiverDetails && user[parcel.receiverDetails]) {
      io.to(user[parcel.receiverDetails]).emit("CarrierParcelAcceptionNotification", {
        success: true,
        otp: receiverOtp,
        message: "A carrier has accepted the parcel being sent to you.",
      });

      io.to(user[parcel.receiverDetails]).emit("receiverUpdateParcelStatus", {
        notification: receiverNotification,
      });
    } else {
      if (!otpMessages[parcel.receiverDetails]) {
        otpMessages[parcel.receiverDetails] = [];
      }
      otpMessages[parcel.receiverDetails].push({ otp : receiverOtp });
      if (!senderMessages[parcel.receiverDetails]) {
        senderMessages[parcel.receiverDetails] = [];
      }
      senderMessages[parcel.receiverDetails].push({ notification: receiverNotification });
      console.log("Pending message saved for offline receiver:", parcel.receiverDetails);
    }

  } catch (error) {
    console.error("Error updating parcel with carrier ID:", error);
  }
});

// Parcel Picked Up Event
socket.on("Parcel Picked Up", async ({ otp, parcelId }) => {
  try {
    // Fetch the parcel details using parcel ID
    const parcel = await ParcelSchema.findById(parcelId);
    if (!parcel) {
      return socket.emit("Error", { message: "Parcel not found" });
    }

    // Fetch sender details using sender ID from the parcel
    const sender = await User.findById(parcel.senderId);
    if (!sender) {
      return socket.emit("Error", { message: "Sender not found" });
    }

    // Verify the OTP provided
    if (sender.otp === otp) {
      // Update the parcel status to "Picked Up"
      parcel.status = "Parcel Picked Up";
      await parcel.save();

      // Notify the sender about the status update
      if (user[sender._id]) {
        io.to(user[sender._id]).emit("Status Updated", {
          message: "Parcel status updated to 'Parcel Picked Up'",
        });
      }
    } else {
      // Emit error for invalid OTP
      socket.emit("Error", { message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error updating parcel status:", error);
    socket.emit("Error", { message: "An error occurred while updating the parcel status" });
  }
});

// Parcel Delivered Event
socket.on("Parcel Delivered", async ({ otp, parcelId }) => {
  try {
    // Fetch the parcel details using parcel ID
    const parcel = await ParcelSchema.findById(parcelId);
    if (!parcel) {
      return socket.emit("Error", { message: "Parcel not found" });
    }

    // Fetch receiver details using receiver ID from the parcel
    const receiver = await User.findById(parcel.receiverDetails);
    if (!receiver) {
      return socket.emit("Error", { message: "Receiver not found" });
    }

    // Verify the OTP provided
    if (receiver.otp === otp) {
      // Update the parcel status to "Delivered"
      parcel.status = "Parcel Delivered";
      await parcel.save();

      // Create a notification for the receiver
      const receiverNotification = new Notification({
        parcelId,
        senderId: parcel.senderId,
        receiverId: parcel.receiverDetails,
        status: "pending",
        notificationType: "carrier response",
        handlingStatus: true,
        message: "A carrier has accepted the parcel being sent to you",
      });
      await receiverNotification.save();

      // Notify the receiver about the status update
      if (user[receiver._id]) {
        io.to(user[receiver._id]).emit("Status Updated", {
          message: "Parcel status updated to 'Parcel Delivered'",
        });
      }
    } else {
      // Emit error for invalid OTP
      socket.emit("Error", { message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error updating parcel status:", error);
    socket.emit("Error", { message: "An error occurred while updating the parcel status" });
  }
});


    // Handle user disconnection
    socket.on("disconnect", () => {
      const userId = Object.keys(user).find((key) => user[key] === socket.id);
      if (userId) {
        delete user[userId];
        // console.log("Updated user mapping after disconnection:", user);
      }
    });
  };



  return { handleUserRegistration, user };
};

module.exports = { setupOnEvents };
