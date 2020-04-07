import React from 'react';
import './style.css';

import Login from './components/Login'

function App() {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="p-20">
        <div className="font-black text-center text-7xl">MAXREPS</div>
        <p className="font-light text-sm text-center text-gray">You're one step closer to you fitness goals.</p>
      </div>
      <Login />
    </div>
  );
}

export default App;
