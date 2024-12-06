import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a context
const SocketContext = createContext();

// Socket URL
const SOCKET_SERVER_URL = 'http://localhost:5000';

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [id, setId] = useState(""); // State to hold userId
  const [parcelNotification, setParcelNotification] = useState(null); // State for parcel notification

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);

    newSocket.on("connect", () => {
      console.log(`Connected to server: ${newSocket.id}`);
      
      // Emit the userId after connecting to the socket server
      if (id) {
       
        newSocket.emit("registerUser", { id }, (response) => {
          console.log("Server Response: ", response); // This logs the callback response from the server
        });  // Emit userId to server (custom event)
      }
    });

    // Listen for parcel notification
    newSocket.on("newParcelNotification", (data) => {
      
      setParcelNotification(data); // Set the received parcel data
      console.log("data in notification", data);
    });

    setSocket(newSocket);

    // Handle disconnection
    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id]);  // Effect re-runs whenever `id` changes

  return (
    <SocketContext.Provider value={{ socket, parcelNotification, setParcelNotification, id, setId }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};
