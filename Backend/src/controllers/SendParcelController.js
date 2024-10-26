const Parcel = require('../models/ParcelModel.js'); // Import the Parcel model
const User = require('../models/UserModel.js'); // Import the User model
const axios = require('axios'); // Optional: for distance calculation API
const {getDistance }= require('../Services/DistanceCalculate');

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
const registerParcel = async (req, res) => {
    try {
       let {
            parcelName, parcelWeight, parcelType, parcelDescription, parcelPhotoUrl,volume,
            senderNum, senderAddress, receiverNum, receiverAddress, distance,
            carrier, carrierVehicle, fromCity, toCity, expectedDeliveryDate
        } = req.body;

        // Validate required fields
        if (!parcelName || !parcelWeight || !parcelType || !parcelDescription || !parcelPhotoUrl ||
            !senderNum || !senderAddress || !receiverNum || !receiverAddress ||
            !carrier || !carrierVehicle || !fromCity || !toCity || !expectedDeliveryDate) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }

        // Check if sender exists in the database
        const sender = await User.findOne({ contactNumber: senderNum });
        console.log('sender',sender)
        if (!sender) {
            return res.status(404).json({ error: 'Sender not found.' });
        }

        // Check if receiver exists in the database
        const receiver = await User.findOne({ contactNumber: receiverNum });
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found.' });
        }

        // Calculate distance between fromCity and toCity
    
        try {
            distance = await getDistance(fromCity, toCity);
            console.log("distance is",distance)
     
           
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
            sender: sender._id, // Store sender's ObjectId
            senderAddress,
            receiver: receiver._id, // Store receiver's ObjectId
            receiverAddress,
            carrier,
            carrierVehicle,
            fromCity,
            toCity,
            distance,
            volume,
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
    registerParcel
};
