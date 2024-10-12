import React from "react";
import AppRoutes from "./pages/routes/AppRoutes";
import { UserLoginProvider } from "./context/userLoginContext";
import { MessageProvider, useMessage } from "./context/MessageContext";

export default function App() {
  return (
    <div>
      <UserLoginProvider>
        <MessageProvider>
          <AppRoutes />
          <AlertMessage />
        </MessageProvider>
      </UserLoginProvider>
    </div>
  );
}

function AlertMessage() {
  const { message, alertType } = useMessage();

  return (
    message && (
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 p-3 rounded-lg text-white text-center font-medium ${
          alertType === "success"
            ? "bg-green-500 border border-green-600"
            : "bg-red-500 border border-red-600"
        }`}
      >
        {message}
      </div>
    )
  );
}
