const mongoose = require("mongoose");

const senderSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName:{type:String , required:true},
    senderContactNumber:{type:Number , required:true},
    senderAddress: {
      type: String,
      required: true,
    },
    senderCity: { type: String, required: true },
    senderState: { type: String, required: true },
    parcelsSent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel",
      required: true,
    },
    senderPostalCode: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sender", senderSchema);
