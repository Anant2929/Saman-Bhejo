import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context
const SocketContext = createContext();

// Socket URL
// const SOCKET_SERVER_URL= "https://saman-bhejo-backend.onrender.com"
 const SOCKET_SERVER_URL = "http://localhost:5000";

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [id, setId] = useState(""); // State to hold userId

  const [parcelData, setParcelData] = useState({});
  const [senderData , setSenderData] = useState({}) ;
  const [deletePendingMessage,setDeletePendingMessage] = useState(false)
  const [receiverData , setReceiverData] = useState({});
  const [parcelNotification, setParcelNotification] = useState(null); // State for parcel notification
  const [socket, setSocket] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);

    newSocket.on("connect", () => {
      console.log(`Connected to server: ${newSocket.id}`);

      // Register user when ID is available
      if (id) {
        newSocket.emit("registerUser", { id }, (response) => {
          console.log("Server Response:", response);
        });
      }
    });

    // Listen for new parcel notifications
    newSocket.on("newParcelNotification", (data) => {
      setParcelNotification(data);
      console.log("New parcel notification received:", data);
    });

    // Handle disconnection
    // newSocket.on("disconnect", () => {
    //   console.log("Disconnected from server");
    // });

    setSocket(newSocket);

    // Cleanup socket on unmount
    return () => {
      newSocket.disconnect();
      console.log("Socket connection closed");
    };
  }, [id]); // Re-run when `id` changes

  // Emit parcel notification when `receiverid` or `parcelData` changes
  useEffect(() => {
    if (socket &&Object.keys(senderData).length > 0 && Object.keys(parcelData).length > 0 && Object.keys(receiverData).length > 0 ) {
      
      console.log("Sending parcel notification:", {receiverData,senderData , parcelData });
      socket.emit(
        "sendParcelNotification",
        {senderData,receiverData, parcelData },
        (response) => {
          console.log("Notification sent to server:", response);
        }
      );
    }
  }, [socket, receiverData,senderData, parcelData]);// Watch for changes in `socket`, `receiverid`, and `parcelData`

  useEffect(() => {
    if (socket && deletePendingMessage) {
      console.log("I am in delete pending message");
      socket.emit("deletePendingMessage",{id}, (response) => {
        console.log("Server Response:", response);
      });
    }
  }, [socket, deletePendingMessage]);
  
  return (
    <SocketContext.Provider
      value={{
        socket,
        parcelNotification,
        setParcelNotification,
        id,
        setId,
        setReceiverData,
        setParcelData,
        setSenderData,
        setDeletePendingMessage
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};
