const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  parcelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Parcel", // Assuming you have a Parcel model
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming you have a User model
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming you have a User model
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "read",],
    default: "pending",
  },
  handlingStatus: {
    type: Boolean, // Defines the type as Boolean
    default: false, // Sets the default value to false
  }
  ,

  notificationType: {
    type: String,
    enum: ["response", "action","carrier response"], // Added type for differentiation
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
     
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
