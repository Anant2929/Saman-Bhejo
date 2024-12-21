const Carrier = require("../models/CarrierModel");
const User = require("../models/UserModel");

// Function to find the carrier by contact number
const findCarrier = async (carrierContactNumber) => {
  try {
    const carrier = await User.findOne({ contactNumber: carrierContactNumber });
    if (!carrier) {
      throw new Error("Carrier not found.");
    }
    return carrier;
  } catch (error) {
    throw new Error(`Error finding carrier: ${error.message}`);
  }
};

// Function to update the carrier's status
const updateCarrierStatus = async (userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { CarrierStatus: true }, // Update the CarrierStatus field
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found.");
    }

    return updatedUser; // Return updated user for logging or debugging
  } catch (error) {
    throw new Error(`Error updating carrier status: ${error.message}`);
  }
};

// Controller to register a new carrier
const CarrierRegister = async (req, res) => {
  console.log("Entered in Carrier Register");

  try {
    // Extract required fields from the request body
    const userId = req.user.id;
    const {
      carrierContactNumber,
      carrierCity,
      carrierState,
      carrierZipCode,
      carrierTravelMode,
      otherMode,
      carrierVehicleModel,
      carrierLicensePlate,
      carriertravelDate,
      carriertravelFromCity,
      carriertravelFromState,
      carrierFromCityPostalCode,
      carriertravelToState,
      carriertravelToCity,
      carrierToCityPostalCode,
      carrierTicketPhoto,
    } = req.body;

    // Validate required fields
    if (
      !carrierContactNumber ||
      !carrierCity ||
      !carrierState ||
      !carrierZipCode ||
      !carrierTravelMode ||
      !carriertravelDate ||
      !carriertravelFromCity ||
      !carriertravelToCity
    ) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Find carrier by contact number
    const carrierExists = await findCarrier(carrierContactNumber);

    // Create a new Carrier instance
    const carrier = new Carrier({
      carrier: carrierExists._id, // Link the carrier to the user
      carrierCity,
      carrierState,
      carrierZipCode,
      carrierTravelMode,
      otherMode,
      carrierVehicleModel,
      carrierLicensePlate,
      carriertravelDate,
      carriertravelFromCity,
      carriertravelFromState,
      carrierFromCityPostalCode,
      carriertravelToState,
      carriertravelToCity,
      carrierToCityPostalCode,
      carrierTicketPhoto,
    });

    // Save the carrier to the database
    await carrier.save();

    // Update carrier status for the user
    await updateCarrierStatus(userId);

    // Send a success response
    res.status(201).json({
      message: "You are registered successfully as a carrier.",
    });
  } catch (error) {
    console.error("Error in CarrierRegister:", error.message);

    // Send an error response
    res.status(500).json({
      message: "An error occurred while registering the carrier.",
      error: error.message,
    });
  }
};

module.exports = { CarrierRegister };
