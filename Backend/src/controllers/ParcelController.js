const Parcel = require("../models/ParcelModel.js");
const User = require("../models/UserModel.js");
const Sender = require("../models/SenderModel.js");
const Receiver = require("../models/ReceiverModel.js");
const { getDistance } = require("../services/DistanceCalculate.js");

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
  return baseRate * weight + distance * DISTANCE_RATE;
};

const registerParcel = async (req, res) => {
  try {
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

    if (!parcelName || !parcelWeight || !parcelType || !parcelDescription || !senderContactNumber || !volume ||    !senderAddress || !senderCity || !senderState || !senderPostalCode || !ReciverAddress || !ReciverCity ||      !ReciverState || !ReciverPostalCode || !RecivercontactNumber || !expectedDeliveryDate) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const sender = await User.findOne({ contactNumber: senderContactNumber });
    if (!sender) return res.status(404).json({ error: "Sender not found." });

    const receiver = await User.findOne({ contactNumber: RecivercontactNumber });
    if (!receiver) return res.status(404).json({ error: "Receiver not found." });

    let distance;
    try {
      distance = await getDistance(senderCity, ReciverCity);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching distance between cities." });
    }

    const estimatedPrice = calculateEstimatedPrice(parcelWeight, parcelType, distance);
    const parcelPhotoUrl = req.file ? `/uploads/${req.file.filename}` : parcelPhotoURL;

    const parcel = new Parcel({
      parcelName,
      parcelWeight,
      parcelType,
      parcelDescription,
      parcelPhotoUrl,
      senderDetails: sender._id,
      receiverDetails: receiver._id,
      fromCity:senderCity,
      fromState :senderState ,
      fromPincode: senderPostalCode,
      toCity:ReciverCity,
      toState:ReciverState,
      toPincode: ReciverPostalCode,
      distance,
      volume,
      expectedDeliveryDate,
      deliveryCharges: estimatedPrice,
      paymentStatus: "Pending",
      trackingStatus: "Booked",
    });

    await parcel.save();

    const senderRecord = new Sender({
      sender: sender._id,
      address: senderAddress,
      city: senderCity,
      state: senderState,
      parcelsSent: parcel._id,
      postCode: senderPostalCode,
    });
    await senderRecord.save();

    const receiverRecord = new Receiver({
      receiver: receiver._id,
      address: ReciverAddress,
      city: ReciverCity ,
      state: ReciverState,
      parcelsReceived: parcel._id,
      postCode: ReciverPostalCode,
    });
    await receiverRecord.save();

    console.log("Everything working as expected");
    res.status(201).json({ message: "Parcel created successfully", parcel });
  } catch (error) {
    console.error("Error in registerParcel:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { registerParcel };
