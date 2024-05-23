import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.open("http://localhost:3001/api/users/google", "_self");
  };

  return (
    <button onClick={handleLogin} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
