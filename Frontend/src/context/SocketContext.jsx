import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a context
const SocketContext = createContext();

// Socket URL (replace with your actual socket server URL)
const SOCKET_SERVER_URL = 'http://localhost:5000'; // Change to your server URL

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish connection to the backend server
    const newSocket = io(SOCKET_SERVER_URL); // Replace with your backend URL

    // Handle connection event
    newSocket.on("connect", () => {
      console.log(`Connected to server: ${newSocket.id}`);
    });

    // Optional: Handle disconnection event
    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Save the socket to the state
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};
