const mongoose = require('mongoose');

// Define Carrier Schema
const carrierSchema = new mongoose.Schema({
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User schema
        required: true
    },
    carrierCity:{
        type: String,
        required : true,
    },
    carrierState :{
        type: String,
        required : true,
    },
    carrierZipCode:{
        type: Number,
        required : true,
    }
,
    carrierTravelMode : {
        type: String,
        enum: ['Airplane', 'Train', 'Car', 'Bicycle', 'Motorcycle', 'Boat', 'Bus', 'Other'],
        required: true,
    },
    otherMode: {
        type: String, // If "Other" is selected, specify mode 
    },

    carrierVehicleModel: {
        type: String, // Vehicle details (optional)
    },
    carrierLicensePlate: {
        type: String, // License plate details (optional)
    },
    carriertravelDate: {
        type: Date, // Date of travel
        required: true
    },
    carriertravelFromCity: {
        type: String, // Starting city
        required: true
    },
    carriertravelFromState : {
        type: String, // Starting city
        required: true
    },
    carrierFromCityPostalCode: { type: Number, required: true }, 
       
    carriertravelToState : {
        type: String, // Destination city
        required: true
    },
    carriertravelToCity: {
        type: String, // Destination city
        required: true
    },
  carrierToCityPostalCode: { type: Number, required: true },
    parcelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parcel', // Reference to User schema
    },
    carrierTicketPhoto: {
        type: String // Path or URL to ticket photo
    },
   
}, { timestamps: true });

// Creating the carrier model
const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;
