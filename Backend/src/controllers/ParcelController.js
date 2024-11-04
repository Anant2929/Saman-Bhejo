const Parcel = require("../models/ParcelModel.js");
const User = require("../models/UserModel.js");
const Sender = require("../models/SenderModel.js");
const Receiver = require("../models/ReceiverModel.js");
const { getDistance } = require("../services/DistanceCalculate.js");
const { getSocket } = require("../sockets/socketManager"); 
const UserSocket = require("../models/SocketIdModel.js")
const BASE_RATES = {
  Document: 5,
  Clothing: 15,
  Electronics: 40,
  Food: 10,
  Medicines: 12,
  Others: 7,
};
const DISTANCE_RATE = 0.3;

const calculateEstimatedPrice = (weight, parcelType, distance) => {
  const baseRate = BASE_RATES[parcelType] || BASE_RATES.Others;
  return Math.round(baseRate * weight + distance * DISTANCE_RATE);
}; 
 const socket = getSocket() 
const emitReceiverConfirmation = async (receiver) => {
  try {
    const userSocket = await UserSocket.findOne({ user: receiver._id });

    if (userSocket) {
    socket.to(userSocket.socketId).emit("newParcelNotification", {
        message: "A new parcel has been registered for you.",
      });
      console.log(`Notification sent to User ID: ${receiver._id}`);
    } else {
      console.log(`Receiver with ID ${receiver._id} not found.`);
    }
  } catch (error) {
    console.error(`Error finding receiver for parcel: ${error.message}`);
  }
};
// Function to destructure and validate common parcel data
const extractParcelData = (req) => {
  const {
    parcelName,
    parcelWeight,
    parcelType,
    parcelDescription,
    parcelPhotoURL,
    volume,
    senderContactNumber,
    senderAddress,
    senderCity,
    senderState,
    senderPostalCode,
    ReciverAddress,
    ReciverCity,
    ReciverState,
    ReciverPostalCode,
    RecivercontactNumber,
    expectedDeliveryDate,
  } = req.body;

  // List of required fields and their values
  const requiredFields = {
    parcelName,
    parcelWeight,
    parcelType,
    parcelDescription,
    volume,
    senderContactNumber,
    senderAddress,
    senderCity,
    senderState,
    senderPostalCode,
    ReciverAddress,
    ReciverCity,
    ReciverState,
    ReciverPostalCode,
    RecivercontactNumber,
    expectedDeliveryDate,
  };

  // Check for any missing fields
  const missingFields = Object.entries(requiredFields)
    .filter(([key, value]) => !value) // Identify fields with empty values
    .map(([key]) => key); // Collect the names of missing fields

  if (missingFields.length > 0) {
    throw new Error(
      `The following fields are required and must be filled: ${missingFields.join(
        ", "
      )}.`
    );
  }

  // If all fields are present, handle the parcel photo URL
  const parcelPhotoUrl = req.file
    ? `/uploads/${req.file.filename}`
    : parcelPhotoURL;

  return {
    parcelName,
    parcelWeight,
    parcelType,
    parcelDescription,
    parcelPhotoURL: parcelPhotoUrl,
    volume,
    senderContactNumber,
    senderAddress,
    senderCity,
    senderState,
    senderPostalCode,
    ReciverAddress,
    ReciverCity,
    ReciverState,
    ReciverPostalCode,
    RecivercontactNumber,
    expectedDeliveryDate,
  };
};

// Function to find sender and receiver by contact number
const findSenderReceiver = async (
  senderContactNumber,
  RecivercontactNumber
) => {
  const sender = await User.findOne({ contactNumber: senderContactNumber });
  if (!sender) throw new Error("Sender not found.");

  const receiver = await User.findOne({ contactNumber: RecivercontactNumber });
  if (!receiver) throw new Error("Receiver not found.");

  return { sender, receiver };
};

// Function to calculate price and distance
const calculatePriceAndDistance = async (
  parcelWeight,
  parcelType,
  senderCity,
  ReciverCity
) => {
  let distance;
  try {
    distance = await getDistance(senderCity, ReciverCity);
  } catch (error) {
    throw new Error("Error fetching distance between cities.");
  }

  const estimatedPrice = calculateEstimatedPrice(
    parcelWeight,
    parcelType,
    distance
  );
  return { estimatedPrice, distance };
};

// Function to handle price and distance calculation response
const get_price_distance = async (req, res) => {
  try {
    console.log("Entered for price and distance");
    const parcelData = extractParcelData(req);
    const { sender, receiver } = await findSenderReceiver(
      parcelData.senderContactNumber,
      parcelData.RecivercontactNumber
    );
    const { estimatedPrice, distance } = await calculatePriceAndDistance(
      parcelData.parcelWeight,
      parcelData.parcelType,
      parcelData.senderCity,
      parcelData.ReciverCity
    );
    // const estimatedPrice = 600;
    // const distance = 6;
    return res
      .status(200)
      .json({
        message: "Price and distance calculated successfully",
        distance,
        estimatedPrice,
      });
  } catch (error) {
    console.error("Error in getting price and distance:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Function to handle parcel registration and save it to the database
const registerParcel = async (req, res) => {
  try {
    const parcelData = extractParcelData(req);
    const { sender, receiver } = await findSenderReceiver(
      parcelData.senderContactNumber,
      parcelData.RecivercontactNumber
    );
    const { estimatedPrice, distance } = await calculatePriceAndDistance(
      parcelData.parcelWeight,
      parcelData.parcelType,
      parcelData.senderCity,
      parcelData.ReciverCity
    );

    const parcelPhotoUrl = req.file
      ? `/uploads/${req.file.filename}`
      : parcelData.parcelPhotoURL;

    const parcel = new Parcel({
      parcelName: parcelData.parcelName,
      parcelWeight: parcelData.parcelWeight,
      parcelType: parcelData.parcelType,
      parcelDescription: parcelData.parcelDescription,
      parcelPhotoUrl,
      senderDetails: sender._id,
      receiverDetails: receiver._id,
      fromCity: parcelData.senderCity,
      fromState: parcelData.senderState,
      fromPincode: parcelData.senderPostalCode,
      toCity: parcelData.ReciverCity,
      toState: parcelData.ReciverState,
      toPincode: parcelData.ReciverPostalCode,
      distance,
      volume: parcelData.volume,
      expectedDeliveryDate: parcelData.expectedDeliveryDate,
      deliveryCharges: estimatedPrice,
      paymentStatus: "Pending",
      trackingStatus: "Booked",
    });

    await parcel.save();

    // Save sender and receiver records
    const senderRecord = new Sender({
      sender: sender._id,
      address: parcelData.senderAddress,
      city: parcelData.senderCity,
      state: parcelData.senderState,
      parcelsSent: parcel._id,
      postCode: parcelData.senderPostalCode,
    });
    await senderRecord.save();

    const receiverRecord = new Receiver({
      receiver: receiver._id,
      address: parcelData.ReciverAddress,
      city: parcelData.ReciverCity,
      state: parcelData.ReciverState,
      parcelsReceived: parcel._id,
      postCode: parcelData.ReciverPostalCode,
    });
    await receiverRecord.save();

    
    await emitReceiverConfirmation(parcelData);
 
    res.status(201).json({ message: "Parcel registered successfully", parcel });
  } catch (error) {
    console.error("Error in registerParcel:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerParcel, get_price_distance };
