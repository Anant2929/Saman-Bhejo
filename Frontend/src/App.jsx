<<<<<<< HEAD
import React from "react";
import AppRoutes from "./pages/routes/AppRoutes";
import { UserLoginProvider } from "./context/userLoginContext";
import { MessageProvider,useMessage } from "./context/MessageContext";

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
  const { message, alertType } = useMessage(); // Use messageType instead of alertType
=======
// import React from 'react';
// import Left from './pages/Left'; // Adjust path if needed
// import Right from './pages/right/Right'; // Adjust path if needed
// import bgImage from './assets/Saman bhejo.jpg'; // Adjust path if needed

// export default function App() {
//   return (
//     <div
//       className="h-screen w-screen p-0 border-black flex"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="w-[50%] h-full">
//         <Left />
//       </div>
//       <div className="w-[50%] h-full">
//         <Right />
//       </div>
//     </div>
//   );
// }


import React from 'react';
import Left from './pages/Left'; // Adjust path if needed
import Right from './pages/right/Right'; // Adjust path if needed
import bgImage from './assets/Saman bhejo.jpg'; // Adjust path if needed
import { MessageProvider, useMessage } from './context/MessageContext';  // Import the MessageContext

export default function App() {
  return (
    <MessageProvider>  {/* Wrap your app in MessageProvider */}
      <div
        className="h-screen w-screen p-0 border-black flex"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-[50%] h-full">
          <Left />
        </div>
        <div className="w-[50%] h-full">
          <Right />
        </div>

        {/* Display global alert message */}
        <AlertMessage />
      </div>
    </MessageProvider>
  );
}

// Component to display the alert message (can be put in a separate file if needed)
function AlertMessage() {
  const { message, alertType } = useMessage();  // Use messageType instead of alertType
>>>>>>> 1c997bcfce9b93580773305c9da536ac3014f685

  return (
    message && (
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 p-3 rounded-lg text-white text-center font-medium 
<<<<<<< HEAD
          ${
            alertType === "success"
              ? "bg-green-500 border border-green-600"
              : "bg-red-500 border border-red-600"
          }`}
=======
          ${alertType === "success" ? "bg-green-500 border border-green-600" : "bg-red-500 border border-red-600"}`}
>>>>>>> 1c997bcfce9b93580773305c9da536ac3014f685
      >
        {message}
      </div>
    )
  );
}
<<<<<<< HEAD
=======


>>>>>>> 1c997bcfce9b93580773305c9da536ac3014f685
