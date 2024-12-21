const Parcel = require("../models/ParcelModel");
const Carrier = require("../models/CarrierModel"); // Make sure this is included

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to ignore time
  return d.toISOString().split("T")[0]; // Return only the date part (YYYY-MM-DD)
};

const ParcelListing = async (req, res) => {
  console.log("in parcelListing");
  try {
    const userId = req.user.id;

    // Find the latest carrier record for the logged-in user
    const latestCarrier = await Carrier.findOne({ carrier: userId }).sort({
      createdAt: -1,
    });
    console.log("in Latestbefore");
    if (!latestCarrier) {
      return res
        .status(404)
        .json({ message: "No carrier data found for this user" });
    }

    console.log("in Latest After");

    const {
      carrierFromCityPostalCode,
      carrierToCityPostalCode,
      carriertravelDate,
    } = latestCarrier;

    const normalizedCarrierTravelDate = normalizeDate(carriertravelDate);
    console.log("in before parcels");
    // Find parcels matching the criteria with expectedDate >= carriertravelDate
    const parcels = await Parcel.find({
      fromPincode: carrierFromCityPostalCode,
      toPincode: carrierToCityPostalCode,
      expectedDeliveryDate: { $eq: normalizedCarrierTravelDate }, // Compare only the date part
    });

    console.log("in After parcels", parcels);

    // console.log("parcels: " , parcels);
    // Check if no parcels are found
    if (!parcels || parcels.length === 0) {
      return res
        .status(404)
        .json({ message: "No parcels found for this Date" });
    }

    console.log("Parcels found");

    res.status(200).json({
      message: "Parcels found successfully",
      parcels,
    });
  } catch (error) {
    // Handle any errors
    console.log(error.message);
    res.status(500).json({
      message: "An error occurred while listing the parcels",
      error: error.message,
    });
  }
};

module.exports = { ParcelListing };
