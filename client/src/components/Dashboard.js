import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'


export default function Dashboard() {
  const {user} = useContext(AuthContext)
    return (
    <div className="text-5xl">Hello from dashboard, {user.name}</div>
    )
}
