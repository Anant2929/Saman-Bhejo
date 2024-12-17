


import React, { createContext, useContext, useState ,useEffect} from "react";

// Create a context
const ParcelContext = createContext();

// Create a provider component
export const ParcelRegistrationProvider = ({ children }) => {
  const [currentState, setCurrentState] = useState(1);
  const [formData, setFormData] = useState({});
  const [fetching,setFetching] = useState(JSON.parse(localStorage.getItem("fetching"))||false)
  // Add new states for fetched parcels and the selected parcel
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
 

  useEffect(() => {
    localStorage.setItem("fetching", JSON.stringify(fetching));
  }, [fetching]);

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
        fetching,
        setFetching
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
