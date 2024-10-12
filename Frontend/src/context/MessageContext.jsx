import React, { createContext, useState, useContext } from "react";

// Create the MessageContext
const MessageContext = createContext();

// Create a custom hook for consuming the context
export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");  // The message itself
  const [alertType, setAlertType] = useState("");  // The alert type: "success" or "error"

  const setTimedMessage = (msg, type, duration = 5000) => {
    setMessage(msg);
    setAlertType(type);

    // Automatically clear the message after 'duration' milliseconds
    setTimeout(() => {
      setMessage("");
      setAlertType("");
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ message, setTimedMessage, alertType }}>
      {children}
    </MessageContext.Provider>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 1c997bcfce9b93580773305c9da536ac3014f685
