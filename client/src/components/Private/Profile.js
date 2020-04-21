import React, {useState,useContext,useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'
import ExerciseService from '../../services/ExerciseService'


import '../../style.css';
import Navbar from './Navbar'
import SingleExercise from './SingleExercise';

export default function Profile(props) {

    const [message,setMessage] = useState(null);
    const {user,setUser} = useContext(AuthContext)
    const [newUser,setNewUser] = useState(user);
    const [t,setT] = useState(user);

    

    
    const onChange = e =>{
        setNewUser({...newUser,[e.target.name] : e.target.value});
    }
    const handleName = e =>{
        e.preventDefault();
        setUser({...user, name: newUser.name})
        AuthService.changeName(newUser)
    }
    const handleEmail= e =>{
        e.preventDefault();
        setUser({...user, email: newUser.email})
        // AuthService.changeEmail(newUser)           //disabled for production
    }

    return (
      <>
      <Navbar />
      <div className="container-lg mx-auto p-6">
        <div>Hello {user.name}!</div>

        <div>Current Name: {user.name}</div>
        <div>Current Email: {user.email}</div>
        <br/>


        {/* //Form to change name */}
        <form onSubmit={handleName}>
            <div>Change Name</div>
            <label className="text-left font-light p-5 text-sm box-border"> Name </label>
            <input 
              className="box-border w-6/12 ml-5 border-b-2 p-1 border-cyan-600" 
              placeholder="Enter new name"
              type='text' 
              name='name' 
              value={newUser.name} 
              onChange={onChange} /> 
            <button className="bg-gray-300 shadow-md m-5 p-2 rounded-sm">Submit</button>
        </form>
        <br/>
        {/* Form to change email */}
        <form onSubmit={handleEmail}>
            <div>Change email</div>
            <label className="text-left font-light p-5 text-sm box-border"> Email </label>
            <input 
              className="box-border w-6/12 ml-5 border-b-2 p-1 border-cyan-600" 
              placeholder="Enter new email"
              type='email' 
              name='email' 
              value={newUser.email} 
              onChange={onChange} /> 
            <button className="bg-gray-300 shadow-md m-5 p-2 rounded-sm">Submit</button>
        </form>
      </div>
      </>
    )
}
