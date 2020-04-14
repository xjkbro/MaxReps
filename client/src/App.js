import React, { useContext, useEffect, useState } from 'react';

import Home from './components/Home'
import Dashboard from './components/Dashboard';
import View from './View';


import Login from './components/Login'
import Register from './components/Register'

import PrivateRoute from './hocs/PrivateRoutes';
import UnPrivateRoute from './hocs/UnPrivateRoutes';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import './style.css';
import {AuthContext} from './context/AuthContext'



function App() {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

  return (
    <Router>
      {console.log(user)}
      <View />
      {/* <UnPrivateRoute  path="/" component={View} /> */}
      <UnPrivateRoute  exact path="/" component={Home}/>
      <UnPrivateRoute  path="/login" component={Login} />
      <UnPrivateRoute  path="/register" component={Register} />
      
      <PrivateRoute  path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
