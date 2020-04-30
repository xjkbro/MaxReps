import React, {useState, useRef, useEffect, useContext} from 'react'
import AuthService from '../services/AuthService'
import { AuthContext } from '../context/AuthContext'
import Home from './Home'



export default function Register(props) {
    const [user, setUser] = useState({name: "", email: "", password: "", confirm: ""})
    const [msg, setMsg] = useState(null)
    let timerID = useRef(null);

    useEffect(()=>{
      return ()=>{
          clearTimeout(timerID);
      }
    },[]);

    const onChange = e => {
      setUser({...user, [e.target.name] : e.target.value})
    }
    const resetForm  = () => {
      setUser({name: "", email: "", password: "", confirm: ""})
    }
    const handleSubmit = e =>{
      e.preventDefault();
      AuthService.register(user).then(data=>{
        console.log(data);

          const { msg, msgError } = data;

          setMsg(msg);
          resetForm();
          if(!msgError){
              timerID = setTimeout(()=>{
                  console.log(props);
                  // props.history.push('/');
              },2000)
          }
      });
  }

    return (
      <>
       <Home />
        <div className="rounded block mx-auto w-6/12">
        {msg==null ? <></> : <p className="text-center mx-auto text-sm bg-gray-100 border-0 border-gray-500 m-2 p-2" >{msg}</p>}
        
        <form className="bg-white pb-4 mx-auto" onSubmit={handleSubmit}>
            <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> Name</label>
            <br />
            <input 
              className="outline-none box-border w-11/12 ml-5 border-b-2 p-1 border-gray focus:border-teal-400" 
              placeholder="Enter name"
              type='text' 
              name='name' 
              value={user.name} 
              onChange={onChange} /> 
          
          <br />
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
          
          <br />
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
          
          <br />
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> Confirm Password</label>
            <br />
            <input 
              className="outline-none box-border w-11/12 ml-5 border-b-2 p-1 border-gray focus:border-teal-400" 
              placeholder="Confirm Password"
              type='password' 
              name='confirm' 
              value={user.confirm} 
              onChange={onChange} /> 
          
          <br />
          <div className="flex flex-row-reverse m-5">
            <button className="transition duration-100 ease-in hover:bg-teal-300 bg-gray shadow-md p-2 rounded-sm">Register</button>
          </div>
        </form>
        </div>
        </>
    )
}
