import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from './services/AuthService';
import { AuthContext } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const View = props =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }
    return(
        <>
                    { !isAuthenticated ? <Home /> : <></>}
</>
    )
}

export default View;