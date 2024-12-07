const mongoose = require("mongoose");

const receiverSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverName:{type : String , required : true},
    receiverContactNumber: { type: Number, required: true },

    receiverAddress: { type: String, required: true },

    receiverCity: { type: String, required: true },

    receiverState: { type: String, required: true },

    parcelsReceived: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel",
      required: true,
    },

    receiverPostalCode: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receiver", receiverSchema);
