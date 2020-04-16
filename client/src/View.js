import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from './services/AuthService';
import { AuthContext } from './context/AuthContext';
import Dashboard from './components/Private/Dashboard';
import Home from './components/Home';

const View = props =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    return(
        <>
            { !isAuthenticated ? <Home /> : <Dashboard/>}
        </>
    )
}

export default View;