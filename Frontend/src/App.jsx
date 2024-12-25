import React, { useEffect } from "react";

import AppRoutes from "./pages/routes/AppRoutes";
import { UserLoginProvider } from "./context/userLoginContext";
import { MessageProvider, useMessage } from "./context/MessageContext";
import { AuthProvider } from "./context/AuthContext";
import { ParcelRegistrationProvider } from "./context/ParcelContext";
import { CarrierContextProvider } from "./context/CarrierContext";
import { SocketProvider } from "./context/SocketContext";

export default function App() {
  return (
    <div>
      <UserLoginProvider>
        <CarrierContextProvider>
          <ParcelRegistrationProvider>
            <MessageProvider>
              <AuthProvider>
                <SocketProvider>
                
                  <AppRoutes />
                </SocketProvider>
              </AuthProvider>
              <AlertMessage />
            </MessageProvider>
          </ParcelRegistrationProvider>
        </CarrierContextProvider>
      </UserLoginProvider>
    </div>
  );
}

function AlertMessage() {
  const { message, alertType } = useMessage();

  return (
    message && (
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-3 rounded-lg text-white text-center font-medium ${
          alertType === "success"
            ? "bg-green-500 border border-green-600"
            : "bg-red-500 border border-red-600"
        }`}
        style={{ zIndex: 9999 }} // Ensures alert is always on top
      >
        {message}
      </div>
    )
  );
}
