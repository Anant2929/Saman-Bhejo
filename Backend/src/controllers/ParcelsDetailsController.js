const Parcel = require("../models/ParcelModel");
const Sender = require("../models/SenderModel");
const Receiver = require("../models/ReceiverModel");


// Fetch parcels for a user
const parcelsDetails = async (req, res) => {

  try {
    const userId = req.user.id; // Extract user ID from the request

    // Fetch parcels where the user is either the sender or the receiver
    const parcels = await Parcel.find({
      $or: [{ senderDetails: userId }, { receiverDetails: userId }],
    });


    // Log the number of parcels found

    // If no parcels are found, respond with 404
    if (!parcels || parcels.length === 0) {
      return res.status(404).json({ message: "No parcels found for the user." });
    }
    // Respond with the parcels
    res.status(200).json({
      success: true,
      userId,
      parcels,
    });
  } catch (error) {
    // Log the error details for debugging
    console.error("Error fetching parcels:", error);
    // Respond with a server error message
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching parcels. Please try again later.",
    });
  }
};

const SpecificParcelDetails = async(req, res) => {
  try {
    // Assuming parcelId is sent as a query parameter
    const { parcelId } = req.params;

    if (!parcelId) {
      console.warn("Parcel ID is missing in the request"); // Warning log
      return res.status(400).json({ 
        success: false, 
        message: "Parcel ID is required." 
      });
    }

    const sender = await Sender.findOne({ parcelsSent: parcelId });
    const receiver = await Receiver.findOne({ parcelsReceived: parcelId });
    const parcel = await Parcel.findOne({_id :parcelId})

    if (!sender && !receiver  && !parcel) {
      console.warn("Sender , Receiver and Parcel not found for Parcel ID:", parcelId); // Warning log
      return res.status(404).json({ 
        success: false, 
        message: "Sender, parcel, Receiver not found." 
      });
    }

    res.status(200).json({
      success: true,
      sender,
      receiver,
      parcel ,
    });
  } catch (error) {
    console.error("Error fetching specific parcel details:", error); // Error log
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching specific parcel details. Please try again later.",
    });
  }
}

module.exports = { parcelsDetails,SpecificParcelDetails };
