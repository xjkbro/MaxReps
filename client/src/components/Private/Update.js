  
import React from 'react';

export default function Update({name, day, msg}){
    const date = new Date(day)
    // console.log(date.toLocaleString())
  
    return (
        <div className="md:flex bg-white rounded-lg p-5 m-10 shadow">
          <img className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0" src="images/defaultavatar.jpg" />
          <div className="text-center md:text-left px-2">
            <div className="text-lg">{name} <span className="text-sm text-gray-600">{date.toLocaleString()}</span></div> 
            {/* <div className="text-purple-500"></div> */}
            <div className="text-grey-700 font-light">{msg}</div>
          </div>
        </div>
    )
}