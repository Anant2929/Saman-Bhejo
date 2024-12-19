const Carrier = require("../models/CarrierModel");

const CarrierRegister = async (req, res) => {
  try {
    const {
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
    } = req.body; // Use req.body to access POST data

    // Create a new Carrier instance
    const carrier = new Carrier({
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

    // Send a success response
    res.status(201).json({
      message: "You are registered successfully as a carrier",
    });
  } catch (error) {
    // Send an error response
    res.status(500).json({
      message: "An error occurred while registering the carrier",
      error: error.message,
    });
  }
};

module.exports = { CarrierRegister };
