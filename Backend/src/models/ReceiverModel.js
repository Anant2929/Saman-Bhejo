const mongoose = require("mongoose");

const receiverSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: { type: String, required: true },

    city: { type: String, required: true },

    state: { type: String, required: true },

    parcelsReceived: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel",
      required: true,
    },

    postCode: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receiver", receiverSchema);
