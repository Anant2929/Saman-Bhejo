import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context
const SocketContext = createContext();

// Socket URL
const SOCKET_SERVER_URL = "http://localhost:5000";

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [id, setId] = useState(""); // State to hold userId
  const [receiverid, setreceiverid] = useState("");
  const [parcelData, setParcelData] = useState({});
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
    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);

    // Cleanup socket on unmount
    return () => {
      newSocket.disconnect();
      console.log("Socket connection closed");
    };
  }, [id]); // Re-run when `id` changes

  // Emit parcel notification when `receiverid` or `parcelData` changes
  useEffect(() => {
    if (socket && receiverid && Object.keys(parcelData).length > 0) {
      console.log("Sending parcel notification:", { receiverid, parcelData });
      socket.emit(
        "sendParcelNotification",
        { receiverid, parcelData },
        (response) => {
          console.log("Notification sent to server:", response);
        }
      );
    }
  }, [socket, receiverid, parcelData]); // Watch for changes in `socket`, `receiverid`, and `parcelData`

  return (
    <SocketContext.Provider
      value={{
        socket,
        parcelNotification,
        setParcelNotification,
        id,
        setId,
        setreceiverid,
        setParcelData,
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
