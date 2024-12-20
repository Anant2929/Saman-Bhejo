import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMessage } from "../../context/MessageContext";
import { useNavigate } from "react-router-dom";
import { useCarrierRegistration } from "../../context/CarrierContext";

function SubmissionSummary() {
  const navigate = useNavigate();
  const { CarriercurrentState, setCarrierCurrentState, CarrierFormData, setCarrierFormData } = useCarrierRegistration();
  const { setTimedMessage } = useMessage();

  const handleEditClick = (num) => {
    setCarrierCurrentState(num);
    navigate("/home/carrierDetails");
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    const submitDataToBackend = async () => {
      try {
        const response = await axios.post("/api/carrier/carrierRegistration",CarrierFormData); // Replace with your backend API URL
        console.log("Data sent successfully:", CarrierFormData);
        console.log("Carrier response", response);

        // Set success message
        setTimedMessage(response.data.message, "success");

        // Navigate and reset state
        navigate("/home");
        setCarrierCurrentState(1);
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Failed to submit data. Please try again.");
      }
    };
    submitDataToBackend();
  };

  return (
    <div className="min-h-screen mx-auto p-8 bg-gray-900 text-white shadow-lg">
      <h2 className="text-center text-3xl font-bold mb-4">Form Submission Summary</h2>
      <p className="text-center text-gray-400 mb-6">Please review the information before proceeding</p>
      {/* Carrier Details */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-200">Carrier's Details</h3>
          <p className="text-gray-300">Name: {CarrierFormData.carrierName}...</p>
          <p className="text-gray-300">Contact No. : {CarrierFormData.carrierContactNumber}...</p>
          
        </div>
        <button
          onClick={() => handleEditClick(1)}
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          Edit
        </button>
      </div>

      {/* Transportation Details */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-200">Transportation Details</h3>
          <p className="text-gray-300">Travel Mode: {CarrierFormData.carriertravelFromCity}</p>
          <p className="text-gray-300">Travel Mode: {CarrierFormData.carriertravelToCity}</p>
          <p className="text-gray-300">Travel Mode: {CarrierFormData.carrierTravelMode}</p>
          <p className="text-gray-300">Expected Date: {CarrierFormData.carriertravelDate}</p>
        </div>
        <button
          onClick={() => handleEditClick(2)}
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          Edit
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => { navigate("/home"); setCurrentState(1); }}
          className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
        >
          Decline
        </button>
        <button
          onClick={handleConfirmClick}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default SubmissionSummary;
