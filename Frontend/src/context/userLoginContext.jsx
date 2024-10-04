import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserLoginContext = createContext();

// Create a provider component
export const UserLoginProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(true);

  return (
    <UserLoginContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserLoginContext.Provider>
  );
};

// Create a custom hook to use the UserLoginContext
export const useUserLogin = () => {
  return useContext(UserLoginContext);
};

