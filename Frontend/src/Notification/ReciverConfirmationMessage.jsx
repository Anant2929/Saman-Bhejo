import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

function ParcelAcceptanceForm() {
  // State for form fields
  const [fields, setFields] = useState({
     senderName,
        senderContactNumber : "",
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
  });

  const { parcelData, senderData, receiverData } = useSocket();

  const {
    parcelName,
    parcelWeight,
    parcelType,
    parcelDescription,
    parcelPhotoUrl,
    volume,
    fromCity,
    fromState,
    fromPincode,
    toCity,
    toState,
    toPincode,
    distance,
    deliveryCharges,
    expectedDeliveryDate,
  } = parcelData;

  const {
    receiverName,
    receiverContactNumber,
    receiverAddress,
    receiverCity,
    receiverState,
    receiverPostalCode,
  } = receiverData;

  const {
    senderName,
    senderContactNumber,
    senderAddress,
    senderCity,
    senderState,
    senderPostalCode,
  } = senderData;

  // Simulate an API call to populate data
  useEffect(() => {
    const fetchParcelDetails = async () => {
      const mockAPIResponse = {
        senderName,
        senderContactNumber,
        senderAddress,
        senderCity,
        senderState,
        senderPostalCode,
        receiverName,
        receiverContactNumber,
        receiverAddress,
        receiverCity,
        receiverState,
        receiverPostalCode,
        fromCity,
        fromState,
        fromPincode,
        toCity,
        toState,
        toPincode,
        parcelName,
        parcelWeight,
        parcelType,
        volume,
        parcelDescription,
        parcelPhotoUrl,
        distance,
        expectedDeliveryDate,
        deliveryCharges,
      };

      // Set the fields with API response
      setFields(mockAPIResponse);
    };

    fetchParcelDetails();
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111922] overflow-x-hidden"
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <div className="flex flex-col items-center py-5">
        {/* Header Image */}
        <div
          className="w-full max-w-[480px] bg-center bg-cover bg-no-repeat rounded-xl h-40 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.usegalileo.ai/sdxl10/bcea0786-3c6f-45fe-abeb-8de948889eec.png')",
          }}
        ></div>

        {/* Title */}
        <h1 className="text-white text-[24px] font-bold leading-tight tracking-[-0.015em] text-center pt-5">
          Parcel Acceptance
        </h1>
        <p className="text-white text-base font-normal leading-normal text-center pt-1 pb-4">
          Please review the parcel details below and confirm or reject
          acceptance.
        </p>

        {/* Details */}
        <div className="w-full max-w-[480px] px-4">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key} className="py-2 flex justify-between items-center">
              <span className="text-white text-base font-medium capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              <span className="text-[#93adc8] text-base font-normal">
                {value || "..."}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex w-full max-w-[480px] justify-between px-4 py-5">
          <button className="w-[48%] h-14 bg-red-500 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform hover:scale-105">
            Reject
          </button>
          <button className="w-[48%] h-14 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform hover:scale-105">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParcelAcceptanceForm;
