import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'
import {Link} from 'react-router-dom';


import '../../style.css';

export default function Navbar(props) {
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }
    console.log(user)
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-100 p-4">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/dashboard"  className="font-semibold text-4xl tracking-tight">MAXREPS</Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-md lg:flex-grow">
            <Link to="/exercise" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
              Workouts
            </Link>
            <Link to="/profile" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
              Profile
            </Link>
            {/* <Link to="/settings"  className="block mt-4 lg:inline-block lg:mt-0 hover:text-white">
              Settings
            </Link> */}
          </div>
          <div>
            <button type="button" className="inline-block text-md px-4 py-2 leading-none border rounded border-black hover:border-transparent hover:bg-white mt-4 lg:mt-0" onClick={onClickLogoutHandler}> Logout </button>
          </div>
        </div>
      </nav>
    )
}
