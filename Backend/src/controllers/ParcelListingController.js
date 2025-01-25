const Parcel = require("../models/ParcelModel");
const Carrier = require("../models/CarrierModel"); // Ensure the model is imported

const normalizeDate = (date) => {
  const d = new Date(date); // Input date
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()+1)
    .toISOString()
    .split("T")[0]; // Sirf date part le lo
};
const ParcelListing = async (req, res) => {
  console.log("ParcelListing API triggered");
  try {
    const userId = req.user.id;

    // Find the latest carrier record for the logged-in user
    const latestCarrier = await Carrier.findOne({ carrier: userId }).sort({
      createdAt: -1,
    });

    if (!latestCarrier) {
      return res.status(404).json({ message: "No carrier data found for this user" });
    }

    const { carriertravelFromCity, carriertravelToCity, carriertravelDate } = latestCarrier;
    const normalizedCarrierTravelDate = normalizeDate(carriertravelDate);

    // Find parcels matching the criteria with expectedDeliveryDate >= carriertravelDate
    const parcels = await Parcel.find({
      fromCity: carriertravelFromCity,
      toCity: carriertravelToCity,
      expectedDeliveryDate: { $gte: normalizedCarrierTravelDate },
      //trackingStatus: "Receiver Accepted"
    
    });

    if (!parcels || parcels.length === 0) {
      return res.status(404).json({ message: "No parcels found for this Date" });
    }

    // Normalize the expectedDeliveryDate for each parcel
    const normalizedParcels = parcels.map((parcel) => ({
       ...parcel._doc,
       expectedDeliveryDate: normalizeDate(parcel.expectedDeliveryDate),
    }));

    // console.log(`Found ${normalizedParcels.length} parcels matching the criteria.`);

    return res.status(200).json({
      message: "Parcels found successfully",
       parcels: normalizedParcels,
      //parcels,
    });
  } catch (error) {
    console.error("Error in ParcelListing:", error.message);
    return res.status(500).json({
      message: "An error occurred while listing the parcels",
      error: error.message,
    });
  }
};

const MyParcel = async (req, res) => {
  try {
    const userId = req.user.id; // Extracting the user ID
    const parcels = await Parcel.find({
      carrierDetails: userId, // Filtering parcels by the carrier's ID
      trackingStatus: {
        $in: [ // Matching one of the specified tracking statuses
          "Carrier Accepted Parcel",
          "Carried",
          "Picked Up",
          "In Transit"
        ]
      }
    });
    console.log("parcel",parcels)
    res.status(200).json({
      success: true,
      parcels, // Sending parcels in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching parcels.",
    });
  }
};


module.exports = { ParcelListing ,MyParcel};
