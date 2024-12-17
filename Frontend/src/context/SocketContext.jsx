import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context
const SocketContext = createContext();

// Socket URL
 //const SOCKET_SERVER_URL= "https://saman-bhejo-backend.onrender.com"
const SOCKET_SERVER_URL = "http://localhost:5000";

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem("id");
    return savedId ? savedId : ""; // Return saved ID if it exists, otherwise return an empty string
  });
   // State to hold userId

  const [parcelData, setParcelData] = useState({});
  const [senderDataInfo, setSenderDataInfo] = useState(
    JSON.parse(localStorage.getItem("senderDataInfo")) || {}
  );
  const [receiverDataInfo, setReceiverDataInfo] = useState(
    JSON.parse(localStorage.getItem("receiverDataInfo")) || {}
  );
  const [parcelDataInfo, setParcelDataInfo] = useState(
    JSON.parse(localStorage.getItem("parcelDataInfo")) || {}
  );
  const [senderData,setSenderData] = useState({})
  const [deletePendingMessage, setDeletePendingMessage] = useState(false);
  const [receiverData, setReceiverData] = useState({});
  const [parcelNotification, setParcelNotification] = useState(null); // State for parcel notification
  const [parcelId, setParcelId] = useState(localStorage.getItem("parcelId")|| "");
  const [reload , setReload] = useState(false) ;
  const [socket, setSocket] = useState(null);
  const [responseNotification,setResponseNotification] = useState(null)
  const [socketId,setSocketId] =useState("");
  // Initialize socket connection
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
   
    if (storedUserId) {
      setId(storedUserId); // Set userId from localStorage to state
    }
  
    const newSocket = io(SOCKET_SERVER_URL);

    newSocket.on("connect", () => {
      console.log(`Connected to server: ${newSocket.id}`);

          setSocketId(newSocket.id)
      // Register user when ID is available
      if (id) {
        newSocket.emit("registerUser", { id }, (response) => {
          console.log("Server Response:", response);
        });
      }
    });

    // Listen for new parcel notifications
    newSocket.on("newParcelNotification", (data) => {
      if (data) {
        let { parcelData, senderData, receiverData } = data;
        setParcelDataInfo(parcelData);
        setSenderDataInfo(senderData);
        setReceiverDataInfo(receiverData);
        localStorage.setItem("parcelDataInfo", JSON.stringify(parcelData));
        localStorage.setItem("senderDataInfo", JSON.stringify(senderData));
        localStorage.setItem("receiverDataInfo", JSON.stringify(receiverData));
        setParcelNotification(true);
      }
      console.log("New parcel notification received:", data);
    });


    newSocket.on("receiverUpdateParcelStatus", (data) => {
      if (data && data.notification) {
        let notification = data.notification;
        console.log("New receiver updates:", notification);
        setResponseNotification(notification)
      } else {
        console.error("Received data is missing notification:", data);
      }
    });
    
    setSocket(newSocket);

    // Cleanup socket on unmount
    return () => {
      newSocket.disconnect();
      console.log("Socket connection closed");
    };
  }, [id]); // Re-run when `id` changes

  // Save parcel data to localStorage when it changes
 

  useEffect(() => {
    if (Object.keys(parcelDataInfo).length > 0) {
      localStorage.setItem("parcelDataInfo", JSON.stringify(parcelDataInfo));
    }
  }, [parcelDataInfo]);

  useEffect(() => {
    if (Object.keys(senderDataInfo).length > 0) {
      localStorage.setItem("senderDataInfo", JSON.stringify(senderDataInfo));
    }
  }, [senderDataInfo]);

  useEffect(() => {
    if (Object.keys(receiverDataInfo).length > 0) {
      localStorage.setItem("receiverDataInfo", JSON.stringify(receiverDataInfo));
    }
  }, [receiverDataInfo]);


  
  useEffect(() => {
    if (parcelId) {localStorage.setItem("parcelId",parcelId)
    console.log("parcelId ",parcelId)
      setParcelId(localStorage.getItem("parcelId"))
        console.log("parceliD",parcelId)
    };

  }, [parcelId]);


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
        setDeletePendingMessage,
        parcelDataInfo,
        senderDataInfo,
        receiverDataInfo,
        parcelId,
        setParcelId,
        socketId,
        responseNotification,
        setResponseNotification
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

//"675d232771008adf0f4c621e