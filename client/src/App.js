import React, { useContext, useEffect, useState } from 'react';

import Home from './components/Home'
import Dashboard from './components/Private/Dashboard';
import View from './View';


import Login from './components/Login'
import Register from './components/Register'

import PrivateRoute from './hocs/PrivateRoutes';
import UnPrivateRoute from './hocs/UnPrivateRoutes';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import './style.css';
import {AuthContext} from './context/AuthContext'
import Exercise from './components/Private/Exercises';
import Profile from './components/Private/Profile';



function App() {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

  return (
    <Router>
      {/* <View /> */}
      <Route exact path="/" component={Login} />
      {/* <UnPrivateRoute  path="/" component={View} /> */}
      {/* <UnPrivateRoute  exact path="/" component={Home}/> */}
      <Route exact path="/login" component={Login}  />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/exercise" component={Exercise} />
      <PrivateRoute path="/profile" component={Profile} />
    </Router>
  );
}

export default App;
