import React, { createContext, useContext, useState } from 'react';

// Create a context
const ParcelContext = createContext();

// Create a provider component
export const ParcelRegistrationProvider = ({ children }) => {
  const [currentState, setcurrentState] = useState(1);
  const [error,setError] = useState("");
  const [formData,setFormData] = useState({})

  return (
    <ParcelContext.Provider value={{ currentState, setcurrentState,error,setError,formData,setFormData }}>
      {children}
    </ParcelContext.Provider>
  );
}
export const useParcelRegistration = () => useContext(ParcelContext);