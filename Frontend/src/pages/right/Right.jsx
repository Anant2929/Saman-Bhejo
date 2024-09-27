import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function Right() {
  const [isloggedin, setLoggedin] = useState(true);

  return (
    <div className="flex justify-center items-center w-full h-full">
      {isloggedin ? <Login /> : <Signup />}
    </div>
  );
}

