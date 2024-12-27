import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParcelRegistration } from "../../context/ParcelContext";
import axios from "axios";
import { useSocket } from "../../context/SocketContext";
import dayjs from "dayjs";

export default function ParcelInfoDisplay() {
  const navigate = useNavigate();
  const { parcelId, socketId } = useSocket();

  const initialFields = {
    senderName: "",
    senderContactNumber: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderPostalCode: "",
    receiverName: "",
    receiverContactNumber: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverPostalCode: "",
    fromCity: "",
    fromState: "",
    fromPincode: "",
    toCity: "",
    toState: "",
    toPincode: "",
    parcelName: "",
    parcelWeight: "",
    parcelType: "",
    volume: "",
    parcelDescription: "",
    parcelPhotoUrl: "",
    distance: "",
    expectedDeliveryDate: "",
    deliveryCharges: "",
    paymentStatus: "", // Added paymentStatus field here
    carrier: null, // For carrier data
  };

  const [fields, setFields] = useState(initialFields);

  useEffect(() => {
    const fetchParcelDetails = async () => {
      try {
        if (!parcelId) {
          console.log("No parcel ID available.");
          return;
        }
        const { data } = await axios.get(`/api/parcel/parcelsInfo/Specific/${parcelId}`);

        if (data.success) {
          const { sender, receiver, parcel, carrier } = data;
          const updatedFields = {
            ...initialFields, // Start with blank values
            senderName: sender?.senderName || "",
            senderContactNumber: sender?.senderContactNumber || "",
            senderAddress: sender?.senderAddress || "",
            senderCity: sender?.senderCity || "",
            senderState: sender?.senderState || "",
            senderPostalCode: sender?.senderPostalCode || "",
            receiverName: receiver?.receiverName || "",
            receiverContactNumber: receiver?.receiverContactNumber || "",
            receiverAddress: receiver?.receiverAddress || "",
            receiverCity: receiver?.receiverCity || "",
            receiverState: receiver?.receiverState || "",
            receiverPostalCode: receiver?.receiverPostalCode || "",
            parcelName: parcel?.parcelName || "",
            parcelWeight: parcel?.parcelWeight || "",
            parcelType: parcel?.parcelType || "",
            volume: parcel?.volume || "",
            parcelDescription: parcel?.parcelDescription || "",
            parcelPhotoUrl: parcel?.parcelPhotoUrl || "",
            distance: parcel?.distance || "",
            expectedDeliveryDate: parcel?.expectedDeliveryDate || "",
            deliveryCharges: parcel?.deliveryCharges || "",
            paymentStatus: parcel?.paymentStatus || "", // Add paymentStatus field if available
            fromCity: parcel?.fromCity || "",
            fromState: parcel?.fromState || "",
            fromPincode: parcel?.fromPincode || "",
            toCity: parcel?.toCity || "",
            toState: parcel?.toState || "",
            toPincode: parcel?.toPincode || "",
            carrier: carrier || null, // Add carrier info if available
          };
          setFields(updatedFields);
        }
      } catch (error) {
        console.error("Error fetching parcel details:", error);
      }
    };

    fetchParcelDetails();
  }, [parcelId]);

  // Check if data is loading
  if (!fields.senderName && !fields.receiverName) {
    return <div className="text-black">Loading parcel details...</div>;
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111922] overflow-x-hidden"
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      {/* Header */}
      <header className="fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50">
        <div className="flex items-center gap-4 text-white animate-blink">
          <div className="w-6 h-6">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Saman Bhejo
          </h2>
        </div>
        <nav className="flex items-center gap-9">
          {["Home", "About", "Notifications", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
              href="/home"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center py-5 bg-gradient-to-br from-gray-900 via-black to-gray-900 mt-20">
        <div
          className="w-full max-w-[480px] bg-center bg-cover bg-no-repeat rounded-xl h-40 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.usegalileo.ai/sdxl10/bcea0786-3c6f-45fe-abeb-8de948889eec.png')",
          }}
        ></div>
        <h1 className="text-white text-[24px] font-bold leading-tight tracking-[-0.015em] text-center pt-5">
          Parcel Details
        </h1>
        <p className="text-white text-base font-normal leading-normal text-center pt-1 pb-4">
          Review the parcel details below.
        </p>
        <div className="w-full max-w-[480px] px-4">
          {/* Sender Details */}
          <h3 className="text-white text-lg font-bold pt-4">Sender Details</h3>
          {["senderName", "senderContactNumber", "senderAddress", "senderCity", "senderState", "senderPostalCode"].map((key) => (
            <div key={key} className="py-2 flex justify-between items-center">
              <span className="text-white text-base font-medium capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              <span
                className={`${
                  key === "distance" || key === "deliveryCharges" || key === "paymentStatus"
                    ? "text-green-500 font-extrabold"
                    : "text-[#93adc8]"
                } text-base`}
              >
                {key === "expectedDeliveryDate" && fields[key]
                  ? dayjs(fields[key]).format("MMMM D, YYYY")
                  : fields[key] || "N/A"}
              </span>
            </div>
          ))}
          
          {/* Receiver Details */}
          <h3 className="text-white text-lg font-bold pt-4">Receiver Details</h3>
          {["receiverName", "receiverContactNumber", "receiverAddress", "receiverCity", "receiverState", "receiverPostalCode"].map((key) => (
            <div key={key} className="py-2 flex justify-between items-center">
              <span className="text-white text-base font-medium capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              <span className="text-[#93adc8] text-base font-normal">
                {fields[key] || "N/A"}
              </span>
            </div>
          ))}

          {/* Parcel Details */}
          <h3 className="text-white text-lg font-bold pt-4">Parcel Details</h3>
          {["parcelName", "parcelWeight", "parcelType", "volume", "parcelDescription", "distance", "expectedDeliveryDate", "deliveryCharges"].map((key) => (
            <div key={key} className="py-2 flex justify-between items-center">
              <span className="text-white text-base font-medium capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              <span
                className={`${
                  key === "deliveryCharges" || key === "paymentStatus" || key === "expectedDeliveryDate"|| key === "distance"
                    ? "text-green-500 font-extrabold"
                    : "text-[#93adc8]"
                } text-base`}
              >
                {key === "expectedDeliveryDate" && fields[key]
                  ? dayjs(fields[key]).format("MMMM D, YYYY")
                  : fields[key] || "N/A"}
              </span>
            </div>
          ))}
          
          {/* Carrier Details - Only if carrier exists */}
          {fields.carrier && (
            <>
              <h3 className="text-white text-lg font-bold pt-4">Carrier Details</h3>
              {["carrierName", "carrierContactNumber", "carrierCity", "carrierState", "carrierZipCode", "carrierTravelMode", "carrierVehicleModel", "carrierLicensePlate", "carriertravelDate", "carrierFromCity", "carrierToCity"].map((key) => (
                <div key={key} className="py-2 flex justify-between items-center">
                  <span className="text-white text-base font-medium capitalize">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </span>
                  <span className="text-[#93adc8] text-base font-normal">
                    {fields.carrier[key] || "N/A"}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
