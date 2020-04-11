import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'


export default function Register() {
    const {registerUser} = useContext(AuthContext)
    const [name, setName] =  useState(null)
    const [email, setEmail] =  useState(null)
    const [password, setPassword] =  useState(null)
    const [confirm, setConfirm] =  useState(null)
    
    const handleSubmit = e => {
        e.preventDefault()
        const newUser = {
            name,
            email,
            password,
            confirm
        }

        registerUser(newUser)

    }

    return (
        <div className="rounded block mx-auto w-6/12">
        <form className="bg-white py-4 mx-auto" onSubmit={handleSubmit}>
            <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> Name</label>
            <br />
            <input className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} /> 
          
          <br />
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> E-mail</label>
            <br />
            <input className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} /> 
          
          <br />
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> Password</label>
            <br />
            <input className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
          
          <br />
          <br />
          <label className="text-left font-light p-5 text-sm box-border w-full "> Confirm Password</label>
            <br />
            <input className="box-border w-11/12 ml-5 border-b-2 p-1 border-cyan-600" type='password' name='confirm' value={confirm} onChange={(e) => setConfirm(e.target.value)} /> 
          
          <br />
          <div className="flex flex-row-reverse m-5">
            <button className="bg-gray-300 shadow-md p-2 rounded-sm">Register</button>
          </div>
        </form>
        </div>
    )
}
