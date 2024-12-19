import React, { createContext, useContext, useState, useEffect } from "react";

const CarrierContext = createContext();

export const CarrierContextProvider = ({ children }) => {
  const [CarriercurrentState, setCarrierCurrentState] = useState(1);
  const [CarrierFormData, setCarrierFormData] = useState({});
  return (
    <CarrierContext.Provider
      value={{
        CarriercurrentState,
        setCarrierCurrentState,
        CarrierFormData,
        setCarrierFormData,
      }}
    >
      {children}
    </CarrierContext.Provider>
  );
};

export const useCarrierRegistration = () => {
  return useContext(CarrierContext);
};

