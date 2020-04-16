import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'

import '../../style.css';
import Navbar from './Navbar'

export default function Dashboard() {
  const {user} = useContext(AuthContext)
  console.log(user)
    return (
      <>
      <Navbar />
      <div className="p-6">
        <div className="text-2xl "> Hello {user.name}, welcome to the dashboard. </div>
        <br/>
        <div className="text-md "> Dashboard stuff with social updates occur and things </div>
      </div>
      </>
    )
}
