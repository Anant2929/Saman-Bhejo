// import React, { createContext, useContext, useState } from 'react';

// // Create a context
// const ParcelContext = createContext();

// // Create a provider component
// export const ParcelRegistrationProvider = ({ children }) => {
//   const [currentState, setCurrentState] = useState(1);

//   const [formData,setFormData] = useState({})

//   return (
//     <ParcelContext.Provider value={{ currentState, setCurrentState,formData,setFormData }}>
//       {children}
//     </ParcelContext.Provider>
//   );
// }

// export const useParcelRegistration = () => {
//   return useContext(ParcelContext);
// };


import React, { createContext, useContext, useState } from "react";

// Create a context
const ParcelContext = createContext();

// Create a provider component
export const ParcelRegistrationProvider = ({ children }) => {
  const [currentState, setCurrentState] = useState(1);
  const [formData, setFormData] = useState({});
  
  // Add new states for fetched parcels and the selected parcel
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);

  return (
    <ParcelContext.Provider
      value={{
        currentState,
        setCurrentState,
        formData,
        setFormData,
        parcels, // Add fetched parcels state
        setParcels,
        selectedParcel, // Add selected parcel state
        setSelectedParcel,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

// Custom hook for easier context access
export const useParcelRegistration = () => {
  return useContext(ParcelContext);
};
