import React, { useState } from 'react';
import Logo from '../assests/images/LogoImg.png'

function NavigationBar() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleLoginClick = () => {
    setShowSnackbar(true);
  
    setTimeout(() => {
      setShowSnackbar(false);
    }, 5000);
   
  };

  return (
    <div className="flex items-center gap-10 " style={{ backgroundColor: '#3a9fbf' }}>
      <div className="p-1 rounded-full bg-white border-1 border-white m-1" style={{ height: '4rem', width: '3.5rem', borderRadius: '50%', backgroundColor: 'white' }}>
        <img src={Logo} className="rounded-full" alt="Logo" style={{ height: '3.5em', width: '3em', borderRadius: '50%' }} />
      </div>
      <p className="text-white font-roboto text-2xl" style={{ margin: 'auto' }}>Weather Dashboard</p>
      <button className="text-black bg-white rounded-md w-16 h-10 ml-4 mr-3" onClick={handleLoginClick}>Login</button>

      {showSnackbar && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-md text-white bg-blue-400">
          Please login with mobile 
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
