// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Navigate import karna
// import Layout from "../Layouts/Layout";
// import Home from "../Home/Home.jsx";
// import Cookies from "js-cookie"; // js-cookie ko import karna

// export default function AppRoutes() {
//   // Cookie check karna
//   const token = Cookies.get('token'); // Change 'token' to your cookie's name
//   // console.log("token :", token); // Correctly log the token value

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={token ? <Navigate to="/home" /> : <Layout />} />
//           {/* Agar cookie milti hai tab hi Home page dikhana */}
//           <Route 
//             path="/home" 
//             // element={token ? <Home /> : <Navigate to="/" />} 
//             // Navigate ka use karke redirect karna
//             element ={<Home/>}
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../home/Home.jsx";
import { useAuth } from '../../context/AuthContext'; // Import the Auth context

export default function AppRoutes() {
  const { token } = useAuth(); // Use the token from AuthContext
  console.log("Token in AppRoutes: ", token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Layout />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/user/login" />} />
        <Route path="/user/login" element={token ? <Navigate to="/home" /> : <Layout />} />
        <Route path="/user/login/google" element={token ? <Navigate to="/home" /> : <Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
