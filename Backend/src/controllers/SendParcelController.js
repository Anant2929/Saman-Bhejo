// controllers/parcelController.js

const Parcel = require('../models/Parcel'); // Import the Parcel model
const axios = require('axios'); // Optional: for distance calculation API

// Base rates for different parcel types (in INR per kg)
const baseRates = {
    Document: 5,
    Clothing: 15,
    Electronics: 40,
    Food: 10,
    Medicines: 12,
    Others: 7
};

// Distance rate (in INR per km)
const distanceRate = 0.3;

// Function to calculate estimated price based on weight, type, and distance
const calculateEstimatedPrice = (weight, parcelType, distance) => {
    const baseRate = baseRates[parcelType] || baseRates.Others;
    const price = (baseRate * weight) + (distance * distanceRate);
    return price;
};

// Controller function to handle parcel creation
const createParcel = async (req, res) => {
    try {
        const {
            parcelName, parcelWeight, parcelType, parcelDescription, parcelPhotoUrl,volume,
            sender, senderAddress, receiver, receiverAddress,distance,
            carrier, carrierVehicle, fromCity, toCity,expectedDeliveryDate,deliveryCharges,
        } = req.body;

        // Validate required fields
        if (!parcelName || !parcelWeight || !parcelType || !parcelDescription || !parcelPhotoUrl ||
            !sender || !senderAddress || !receiver || !receiverAddress ||
            !carrier || !carrierVehicle || !fromCity || !toCity || !expectedDeliveryDate) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }

        // Calculate distance between fromCity and toCity
        
        try {
            // Example distance calculation using an API or custom logic
            const response = await axios.get(`YOUR_DISTANCE_API?from=${fromCity}&to=${toCity}`);
            distance = response.data.distance;
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching distance between cities.' });
        }

        // Calculate estimated price
        const estimatedPrice = calculateEstimatedPrice(parcelWeight, parcelType, distance);

        // Create and save parcel
        const parcel = new Parcel({
            parcelName,
            parcelWeight,
            parcelType,
            parcelDescription,
            parcelPhotoUrl,
            sender,
            senderAddress,
            receiver,
            receiverAddress,
            carrier,
            carrierVehicle,
            fromCity,
            toCity,
            distance,
            expectedDeliveryDate,
            deliveryCharges: estimatedPrice,
            paymentStatus: 'Pending',
            trackingStatus: 'Booked'
        });

        await parcel.save();
        res.status(201).json({ message: 'Parcel created successfully', parcel });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

module.exports = {
    createParcel
};
