import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UnPrivateRoute = ({component : Component,...rest})=>{
    console.log({component: Component});
    
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            console.log(props);

            if(isAuthenticated)
                return <Redirect location={props.location.pathname} to={{ pathname: '/', 
                                       state : {from : props.location}}}/>
                                       
            return <Component {...props}/>
        }}/>
    )
}

export default UnPrivateRoute;