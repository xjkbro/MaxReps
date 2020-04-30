import React, {useState, useRef, useEffect, useContext} from 'react'
import AuthService from '../services/AuthService'
import { AuthContext } from '../context/AuthContext'
import Home from './Home'


export default function Login(props) {
    const [user,setUser] = useState({email: "", password : ""});
    const [msg,setMsg] = useState(null)
    const authContext = useContext(AuthContext)
    const [isAuth, setAuth] = useState(null)

    const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
    }

    const handleSubmit = e =>{
      e.preventDefault();
      AuthService.login(user)
        .then(data=>{
            console.log(data)
            // const { msg, msgError } = data;
            const { isAuthenticated,user} = data;
            if(isAuthenticated){
              
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                setAuth(true);
                props.history.push('/dashboard');
            }
            else
                setAuth(false);
        })
        .catch((err) => {setAuth(false)})
  }


    return (
      <>
      <Home />
        <div className="rounded block mx-auto w-6/12">
      { isAuth == false ? <p className="text-center mx-auto text-sm bg-gray-100 border-0 border-gray-500 m-2 p-2" >Login Unsuccessful</p> : <></>}

        <form className="bg-white py-4 mx-auto" onSubmit={handleSubmit}>
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> E-mail</label>
            <br />
            <input 
              className="outline-none box-border w-11/12 ml-5 border-b-2 p-1 border-gray focus:border-teal-400" 
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
              className="outline-none box-border w-11/12 ml-5 border-b-2 p-1 border-gray focus:border-teal-400" 
              placeholder="Enter Password"
              type='password' 
              name='password' 
              value={user.password} 
              onChange={onChange} /> 
          
          <br/>
          <div className="flex flex-row-reverse m-5">
            <button className="transition duration-100 ease-in hover:bg-teal-300 bg-gray shadow-md p-2 rounded-sm">Login</button>
          </div>
        </form>
        </div>
        </>
    )
}
