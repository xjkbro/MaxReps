import React, { useContext, useState } from 'react';
import './style.css';

import { AuthContext, AuthProvider } from './context/AuthContext'

import Login from './components/Login'
import Register from './components/Register'


function App() {

  const [isLoginPage , setLoginPage] = useState(true)
  const context =  useContext(AuthContext)
  console.log(context)

  return (
    <AuthProvider>
      <div className="w-screen h-screen bg-gray-100">
        <div className="p-20">
          <div className="font-black text-center text-7xl">MAXREPS</div>
          <p className="font-light text-sm text-center text-gray">You're one step closer to you fitness goals.</p>
        </div>
        <div className="block mx-auto w-6/12">
          <button
            className={isLoginPage ? 'py-2 rounded-t text-center mx-auto w-6/12 bg-white' : 'py-2 rounded-t text-center mx-auto w-6/12 bg-blue'} 
            onClick={() => setLoginPage(true)}> Login </button>
          <button
            className={isLoginPage ? 'py-2 rounded-t text-center mx-auto w-6/12 bg-blue' : 'py-2 rounded-t text-center mx-auto w-6/12 bg-white' } 
            onClick={() => setLoginPage(false)}> Register </button>
        </div>
        {isLoginPage ?  <Login /> : <Register />}
      </div>
    </AuthProvider>
  );
}

export default App;
