import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a context
const SocketContext = createContext();

// Socket URL
const SOCKET_SERVER_URL = 'https://saman-bhejo-backend.onrender.com';

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [parcelNotification, setParcelNotification] = useState(null); // State for parcel notification

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);

    newSocket.on("connect", () => {
      console.log(`Connected to server: ${newSocket.id}`);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Listen for parcel notification
    newSocket.on("newParcelNotification", (data) => {
      setParcelNotification(data); // Set the received parcel data
      console.log("data in notification",data)
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, parcelNotification, setParcelNotification }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};
