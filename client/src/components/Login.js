import React, {useState, useRef, useEffect, useContext} from 'react'
import AuthService from '../services/AuthService'
import { AuthContext } from '../context/AuthContext'
import Home from './Home'


export default function Login(props) {
    const [user,setUser] = useState({email: "", password : ""});
    const [msg,setMsg] = useState(null)
    const authContext = useContext(AuthContext)

    const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
    }

    const handleSubmit = e =>{
      e.preventDefault();
      AuthService.login(user).then(data=>{
          console.log(data);
          console.log(props);

          const { isAuthenticated,user} = data;
          if(isAuthenticated){
            
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              props.history.push('/dashboard');
          }
          else
              setMsg(msg);
      });
    }


    return (
      <>
      <Home />
        <div className="rounded block mx-auto w-6/12">
        <form className="bg-white py-4 mx-auto" onSubmit={handleSubmit}>
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> E-mail</label>
            <br />
            <input 
              className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" 
              placeholder="Enter Email"
              type='email' 
              name='email' 
              value={user.email} 
              onChange={onChange} /> 
          
          <br/>
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> Password</label>
            <br />
            <input 
              className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" 
              placeholder="Enter Password"
              type='password' 
              name='password' 
              value={user.password} 
              onChange={onChange} /> 
          
          <br/>
          <div className="flex flex-row-reverse m-5">
            <button className="bg-gray-300 shadow-md p-2 rounded-sm">Login</button>
          </div>
        </form>
        </div>
        </>
    )
}
