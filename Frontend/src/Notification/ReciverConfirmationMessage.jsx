import React from 'react';
import { useSocket } from '../context/SocketContext.jsx';

const ParcelNotification = () => {
  const { parcelNotification, setParcelNotification,setDeletePendingMessage } = useSocket();

  const handleOpen = () => {
    // Code to confirm the parcel
    console.log("Parcel confirmed");
    setParcelNotification(null); // Hide modal after confirmation
    setDeletePendingMessage(true);
    
  };

  const handleDecline = () => {
    // Code to decline the parcel
    console.log("Parcel declined");
    setParcelNotification(null); // Hide modal after decline
  };

  if (!parcelNotification) return null; // If no notification, do not render

  return (
    <div className="modal">
      <h2>Parcel Notification</h2>
      <p>{parcelNotification.message}</p>
      <div>
        <h3>Parcel Details:</h3>
        <pre>{JSON.stringify(parcelNotification.parcelData, null, 2)}</pre>
      </div>
      <button onClick={handleOpen}>Confirm</button>
      <button onClick={handleDecline}>Decline</button>
    </div>
  );
};

export default ParcelNotification;
