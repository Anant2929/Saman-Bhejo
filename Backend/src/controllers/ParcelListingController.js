const Parcel = require("../models/ParcelModel");
const Carrier = require("../models/CarrierModel"); // Make sure this is included

const ParcelListing = async (req, res) => {
  console.log("in parcelListing");
  try {
    const userId = req.user.id;

    // Find the latest carrier record for the logged-in user
    const latestCarrier = await Carrier.findOne({carrier: userId }).sort({ createdAt: -1 });
    console.log("in Latestbefore");
    if (!latestCarrier) {
      return res.status(404).json({ message: "No carrier data found for this user" });
    }

    console.log("in Latest After");

    const { carrierFromCityPostalCode, carrierToCityPostalCode, carriertravelDate } = latestCarrier;

    console.log("in before parcels");
    // Find parcels matching the criteria with expectedDate >= carriertravelDate
    const parcels = await Parcel.find({
      fromPincode: carrierFromCityPostalCode,
      toPincode: carrierToCityPostalCode,
      expectedDate: { $gte: carriertravelDate }, // Filter parcels with expectedDate >= travelDate
    });

    console.log("in After parcels");

    console.log("parcels: " , parcels);
    // Check if no parcels are found
    if (!parcels || parcels.length === 0) {
      return res.status(404).json({ message: "No parcels found for this Date" });
    }

    colnsole.log("Parcels found");

    // Send the found parcels
    res.status(200).json({
      message: "Parcels found successfully",
      parcels,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "An error occurred while listing the parcels",
      error: error.message,
    });
  }
};

module.exports = { ParcelListing };
