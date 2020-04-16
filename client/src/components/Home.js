import React, { useContext, useEffect, useState } from 'react';
import PrivateRoute from '../hocs/PrivateRoutes';
import UnPrivateRoute from '../hocs/UnPrivateRoutes';
import {Link} from 'react-router-dom';

import '../style.css';


import Login from './Login'
import Register from './Register'
import Dashboard from './Private/Dashboard';
import { AuthContext } from '../context/AuthContext';

const Home = (props) => {
  const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
  // console.log(props.history.location.pathname)
  // console.log(props)
  const [isLoginPage , setLoginPage] = useState(true)


  return (
      <div className="bg-gray-100">
        <div className="p-20">
          <div className="font-black text-center text-7xl">MAXREPS</div>
          <p className="font-light text-sm text-center text-gray">You're one step closer to you fitness goals.</p>
        </div>
        <div className="block mx-auto w-6/12">
          <Link to="/login"><button
            className={isLoginPage ? 'py-2 rounded-t text-center mx-auto w-6/12 bg-white' : 'py-2 rounded-t text-center mx-auto w-6/12 bg-blue'} 
            onClick={() => setLoginPage(true)}>  Login  </button></Link>
          <Link to="/register"><button
            className={isLoginPage ? 'py-2 rounded-t text-center mx-auto w-6/12 bg-blue' : 'py-2 rounded-t text-center mx-auto w-6/12 bg-white' } 
            onClick={() => setLoginPage(false)}> Register </button></Link>
        </div>
        {/* {isLoginPage ?  
        // <Login /> 
        <UnPrivateRoute path="/login" component={Login} />
        : 
        // <Register />
        <UnPrivateRoute path="/register" component={Register} />
        } */}
      </div>
  );
}

export default Home;
