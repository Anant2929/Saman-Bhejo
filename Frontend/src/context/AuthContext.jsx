// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(Cookies.get('token'));

//   // Function to update the token
//   const updateToken = (newToken) => {
//     if (newToken) {
//       Cookies.set('token', newToken); // Set the new token in cookies
//       setToken(newToken); // Update the state
//     } else {
//       Cookies.remove('token'); // Remove the token from cookies
//       setToken(null); // Set state to null
//     }
//   };

//   const clearToken = () => {
//     setToken(null); // Clear token
//   };

//   useEffect(() => {
//     // Check the token when the app loads
//     setToken(Cookies.get('token'));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token, updateToken , clearToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Create a custom hook for easier access to the Auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null); // Initialize token as null

//   // Function to update the token
//   const updateToken = (newToken) => {
//     if (newToken) {
//       Cookies.set('token', newToken); // Set the new token in cookies
//       setToken(newToken); // Update the state
//     } else {
//       Cookies.remove('token'); // Remove the token from cookies
//       setToken(null); // Clear the state
//     }
//   };

//   const clearToken = () => {
//     Cookies.remove('token'); // Clear token from cookies
//     setToken(null); // Clear token state
//   };

//   useEffect(() => {
//     // Check the token from cookies when the app loads or refreshes
//     const storedToken = Cookies.get('token');
//     if (storedToken) {
//       setToken(storedToken); // Set token from cookies to state if available
//     }
//   }, []); // Empty dependency array ensures this runs once on mount

//   return (
//     <AuthContext.Provider value={{ token, updateToken, clearToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Create a custom hook for easier access to the Auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };


import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);  // Initial token state is null

  // Function to update the token (used on login or registration)
  const updateToken = (newToken) => {
    if (newToken) {
      Cookies.set('token', newToken, { expires: 7 }); // Set the new token in cookies
      setToken(newToken); // Set the token in state
    }
  };

  // Function to clear the token (used on logout)
  const clearToken = () => {
    Cookies.remove('token');  // Remove the token from cookies
    setToken(null);           // Clear the token from state
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easier access to the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
