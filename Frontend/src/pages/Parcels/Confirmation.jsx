import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParcelRegistration } from "../../context/ParcelContext";
import { useMessage } from "../../context/MessageContext";
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';

function SubmissionSummary() {
  const navigate = useNavigate();
  const { formData, setCurrentState } = useParcelRegistration();
  const { setTimedMessage } = useMessage();
  const [showNotification, setShowNotification] = useState(false);
  const { parcelNotification } = useSocket();

  useEffect(() => {
    // Check if parcelNotification has any data
    if (parcelNotification) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [parcelNotification]);

  const handleEditClick = (path) => {
    navigate(path);
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    const submitDataToBackend = async () => {
      try {
        const response = await axios.post('/api/parcel/register', formData); // Replace with your backend API URL
        console.log('Data sent successfully:', formData);
        setTimedMessage(response.data.message, "success");
        
        navigate('/home');
        setCurrentState(1);
      } catch (error) {
        console.error('Error submitting data:', error);
        alert('Failed to submit data. Please try again.');
      }
    };
    submitDataToBackend();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-center text-3xl font-bold mb-2">Form Submission Summary</h2>
      <p className="text-center text-gray-400 mb-6">Please review the information before proceeding</p>

      {/* Show Notification if applicable */}
      {showNotification && (
        <div className="bg-green-600 p-4 rounded-lg mb-4">
          <p className="text-white">Notification: {parcelNotification}</p>
        </div>
      )}

      {/* Sender's Details */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Sender's Details</h3>
          <p className="text-gray-300">Name: {formData.senderName}...</p>
        </div>
        <button 
          onClick={() => handleEditClick('/edit-sender')} 
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
          onClick={() => handleEditClick('/edit-receiver')} 
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
          onClick={() => handleEditClick('/edit-parcel')} 
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
            <p className="text-4xl font-bold text-green-400">₹{formData.estimatedPrice}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={() => alert('Declined')}
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
