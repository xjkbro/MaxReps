import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'


export default function Login() {
    const {loginUser} = useContext(AuthContext)
    const [email, setEmail] =  useState(null)
    const [password, setPassword] =  useState(null)
    
    const handleLogin = e => {
        e.preventDefault()
        const auth = {
            email,
            password
        }
        loginUser(auth)

    }

    return (
        <div className="rounded block mx-auto w-6/12">
        <form className="bg-white py-4 mx-auto" onSubmit={handleLogin}>
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> E-mail</label>
            <br />
            <input className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} /> 
          
          <br/>
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> Password</label>
            <br />
            <input className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
          
          <br/>
          <div className="flex flex-row-reverse m-5">
            <button className="bg-gray-300 shadow-md p-2 rounded-sm">Login</button>
          </div>
        </form>
        </div>
    )
}
