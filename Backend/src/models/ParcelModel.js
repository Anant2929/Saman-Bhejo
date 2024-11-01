const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  parcelName: { type: String, required: true },
  parcelWeight: { type: Number, required: true },
  parcelType: {
    type: String,
    enum: [
      "Document",
      "Clothing",
      "Electronics",
      "Food",
      "Medicines",
      "Others",
    ],
    required: true,
  },
  parcelDescription: { type: String, required: true },
  parcelPhotoUrl: { type: String },
  volume: { type: Number, required: true },
  senderDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromCity: { type: String, required: true },
  fromState: { type: String, required: true },
  fromPincode: { type: Number, required: true },
  toCity: { type: String, required: true },
  toState: { type: String, required: true },
  toPincode: { type: Number, required: true },
  distance: { type: Number, required: true },
  trackingStatus: {
    type: String,
    enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Canceled"],
    default: "Booked",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Failed"],
    default: "Pending",
  },
  deliveryCharges: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expectedDeliveryDate: { type: Date, required: true },
});

parcelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Parcel", parcelSchema);
