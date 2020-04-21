import React, {useContext,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'
import {Link} from 'react-router-dom';


import '../../style.css';

export default function Navbar(props) {
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    const [isHidden, setIsHidden] = useState(false)

    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }
    const handleCollapse = (e) => {
      setIsHidden(!isHidden)
      console.log(isHidden)
    }
    console.log(user)
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-100 p-4">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/dashboard"  className="font-semibold text-4xl tracking-tight">MAXREPS</Link>
        </div>
        <div className="block sm:hidden">
          <button className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white" onClick={handleCollapse}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={(isHidden ? "hidden" : "") + " w-full block flex-grow sm:flex sm:items-center sm:w-auto"}>
          <div className="text-md sm:flex-grow">
            <Link to="/exercise" className="block mt-4 sm:inline-block sm:mt-0 hover:text-white mr-4">
              Workouts
            </Link>
            <Link to="/profile" className="block mt-4 sm:inline-block sm:mt-0 hover:text-white mr-4">
              Profile
            </Link>
          </div>
          <div>
            <button type="button" className="inline-block text-md font-bold py-2 px-4 rounded-full leading-none border  border-black hover:border-transparent hover:bg-white mt-4 lg:mt-0" onClick={onClickLogoutHandler}> Logout </button>
          </div>
        </div>
      </nav>
    )
}
