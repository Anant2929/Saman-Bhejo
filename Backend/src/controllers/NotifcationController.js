const Notification = require("../models/Notification"); // Path to your Notification model

// Controller to create and save a notification
const createNotification = async (req, res) => {
  const { parcelId, senderId, receiverId, carrierId } = req.body;

  try {
    // Validation: Check if all required fields are provided
    if (!parcelId || !senderId || !receiverId || !carrierId) {
      return res.status(400).json({
        success: false,
        message: "All fields (parcelId, senderId, receiverId, carrierId) are required.",
      });
    }

    // Create a new Notification document
    const notification = new Notification({
      parcelId,
      senderId,
      receiverId,
      carrierId,
    });

    // Save the notification to the database
    await notification.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Notification created successfully!",
      data: notification,
    });
  } catch (error) {
    // Handle any errors that occur during the save process
    console.error("Error creating notification:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the notification.",
      error: error.message,
    });
  }
};

module.exports = { createNotification };
