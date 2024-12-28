import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserLoginContext = createContext();

// Create a provider component
export const UserLoginProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(true);
  const [forgotPassword , setForgotPassword] = useState(false);

  return (
    <UserLoginContext.Provider value={{ userLogin, setUserLogin  , forgotPassword , setForgotPassword}}>
      {children}
    </UserLoginContext.Provider>
  );
};

// Create a custom hook to use the UserLoginContext
export const useUserLogin = () => {
  return useContext(UserLoginContext);
};

