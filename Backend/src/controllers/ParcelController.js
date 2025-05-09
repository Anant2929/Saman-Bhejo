const Parcel = require("../models/ParcelModel.js");
const User = require("../models/UserModel.js");
const Sender = require("../models/SenderModel.js");
const Receiver = require("../models/ReceiverModel.js");
const { getDistance } = require("../Services/DistanceCalculate.js");
const { setupEmitEvents } = require("../sockets/emitEvents.js");

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
    fromCity,
    fromState,
    fromZip,
    toCity,
    toState,
    toZip,

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
    fromCity,
    fromState,
    fromZip,
    toCity,
    toState,
    toZip,

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
    ? req.file.path
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
    fromCity,
    fromState,
    fromZip,
    toCity,
    toState,
    toZip,
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

    if(receiver === sender){
      throw new Error("Sender and receiver name and contact number should be different.")
    }
  return { sender, receiver } 
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
      parcelData.fromCity,
      parcelData.toCity
    );
    return res.status(200).json({
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
      parcelData.fromCity,
      parcelData.toCity
    );

    const parcel = new Parcel({
      parcelName: parcelData.parcelName,
      parcelWeight: parcelData.parcelWeight,
      parcelType: parcelData.parcelType,
      parcelDescription: parcelData.parcelDescription,
      parcelPhotoUrl: parcelData.parcelPhotoURL,
      senderDetails: sender._id,
      receiverDetails: receiver._id,
      fromCity: parcelData.fromCity,
      fromState: parcelData.fromState,
      fromPincode: parcelData.fromZip,
      toCity: parcelData.toCity,
      toState: parcelData.toState,
      toPincode: parcelData.toZip,
      distance,
      volume: parcelData.volume,
      expectedDeliveryDate: parcelData.expectedDeliveryDate,
      deliveryCharges: estimatedPrice,
      paymentStatus: "Pending",
      trackingStatus: "Sender Created",
    });

    await parcel.save();

    // Save sender and receiver records
    const senderRecord = new Sender({
      sender: sender._id,
      senderName : sender.name,
      senderContactNumber:sender.contactNumber,
      senderAddress: parcelData.senderAddress,
      senderCity: parcelData.senderCity,
      senderState: parcelData.senderState,
      parcelsSent: parcel._id,
      senderPostalCode: parcelData.senderPostalCode,
    });
    await senderRecord.save();

    const receiverRecord = new Receiver({
      receiver: receiver._id,
      receiverName : receiver.name,
      receiverContactNumber:receiver.contactNumber,
      receiverAddress: parcelData.ReciverAddress,
      receiverCity: parcelData.ReciverCity,
      receiverState: parcelData.ReciverState,
      parcelsReceived: parcel._id,
      receiverPostalCode: parcelData.ReciverPostalCode,
    });
    await receiverRecord.save();

    console.log("userid", sender._id, "receive", receiver._id);

    res
      .status(201)
      .json({ message: "Parcel registered successfully",receiverRecord,senderRecord, parcel });
  } catch (error) {
    console.error("Error in registerParcel:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerParcel, get_price_distance };
