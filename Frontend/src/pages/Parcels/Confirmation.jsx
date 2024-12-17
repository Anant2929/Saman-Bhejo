import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParcelRegistration } from "../../context/ParcelContext";
import { useMessage } from "../../context/MessageContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";


function SubmissionSummary() {
  const navigate = useNavigate();
  const { formData, setCurrentState } = useParcelRegistration();
  const { setTimedMessage } = useMessage();
  ;
  const {setReceiverData,setSenderData, setParcelData,socket } = useSocket();

 

  const handleEditClick = ( num ) => {
    setCurrentState (num)
    navigate("/parcel/details");
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    const submitDataToBackend = async () => {
      try {
        const response = await axios.post("/api/parcel/register", formData); // Replace with your backend API URL
        console.log("Data sent successfully:", formData);
  
        console.log("Parcel response", response);
        
        // Set data
        setParcelData(response.data.parcel);
        setReceiverData(response.data.receiverRecord);
        setSenderData(response.data.senderRecord);
  
        console.log("Updated Parcel Data:", response.data.parcel);
        console.log("Updated Sender Data:", response.data.senderRecord);
        console.log("Updated Receiver Data:", response.data.receiverRecord);
  
        // Emit socket event for parcel notification
        if (socket) {
          const { senderRecord, receiverRecord, parcel } = response.data;
          console.log("Sending parcel notification:", { senderRecord, receiverRecord, parcel });
  
          socket.emit(
            "sendParcelNotification",
            { senderData: senderRecord, receiverData: receiverRecord, parcelData: parcel },
            (serverResponse) => {
              console.log("Notification sent to server:", serverResponse);
            }
          );
        }
  
        // Set success message
        setTimedMessage(response.data.message, "success");
  
        // Navigate and reset state
        navigate("/home");
        setCurrentState(1);
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Failed to submit data. Please try again.");
      }
    };
    submitDataToBackend();
  };
  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#000000]  text-white rounded-lg shadow-xl">
      <h2 className="text-center text-3xl font-bold mb-2">
        Form Submission Summary
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Please review the information before proceeding
      </p>

      {/* Sender's Details */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Sender's Details</h3>
          <p className="text-gray-300">Name: {formData.senderName}...</p>
        </div>
        <button
          onClick={() => handleEditClick(2)}
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          Edit
        </button>
      </div>

      {/* Receiver's Details */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Receiver's Details</h3>
          <p className="text-gray-300">Name: {formData.ReciverName}...</p>
        </div>
        <button
          onClick={() => handleEditClick(3)}
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          Edit
        </button>
      </div>

      {/* Parcel Details */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Parcel Details</h3>
          <p className="text-gray-300">Parcel Type: {formData.parcelType}</p>
          <p className="text-gray-300">Weight: {formData.parcelWeight}kg</p>
        </div>
        <button
          onClick={() => handleEditClick(1)}
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          Edit
        </button>
      </div>

      {/* Total Price */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Total Price</h3>
        <div className="flex justify-between items-center">
          <div className="text-gray-300">
            <p>Last Delivery Date: {formData.expectedDeliveryDate}</p>
            <p>Distance: {formData.distance} KM</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-green-400">
              ₹{formData.estimatedPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => {navigate("/home") , setCurrentState(1)}}
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
