import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'

import '../../style.css';
import Navbar from './Navbar'
import Update from './Update'

import SocialUpdateService from '../../services/SocialUpdateService'

// import avatar from '../../../public/images/defaultavatar.jpg';


export default function Dashboard() {

  const {user} = useContext(AuthContext)
  
  const [updates, setUpdates] = useState([])
  const [maxInput, setMaxInput] = useState(300)
  const [updateInput, setUpdateInput] = useState("")
  const [populateData, setPopulateData] = useState(true)

  useEffect(()=>{
    LoadUpdate()
  },[]);


  const LoadUpdate = ()=> {
    let arr =[]
    SocialUpdateService.getUpdates()
    .then((data) => {
        console.log(data);
        if (data.isPopulated){
          setPopulateData(true)
          setUpdates(data.data);
      }
      else
          setPopulateData(false)
    });
    
  }

  const handleUpdate =(e) => {
    const val = updateInput.length - e.target.value.length
    setUpdateInput(e.target.value)
    setMaxInput(maxInput+val)
  }

  const submitUpdate = async (e) => {
    e.preventDefault()
    await SocialUpdateService.postUpdate({
      date: Date.now(),
      post: updateInput
    })
    LoadUpdate()
    setUpdateInput("")
  }
  
  return (
      <>
      <Navbar />
        <div className="xl:grid grid-cols-4 gap-6 container mx-auto">
          <div className="xl:hidden col-span-1">
                <div className="md:flex bg-white rounded-lg p-5 m-10 shadow">
                <img className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0" src="images/defaultavatar.jpg" />
                <div className="text-center md:text-left md:px-10 w-100">
                  <div className="text-lg">{user.name}</div>
                  <textarea className="text-sm bg-gray-200 rounded md:w-100" cols="100" rows="2" maxlength="300" value={updateInput} onChange={handleUpdate}></textarea>
                  <div className="text-sm ">Character Limit: {maxInput}</div> 

                  <button className="text-sm bg-gray-200 rounded p-2" onClick={submitUpdate}>Update</button>
                </div>
              </div>
          </div>
          
          <div className="col-span-3">
              {updates.map(update=> {
                return <Update key={update.id} name={update.name} day={update.post_date} msg={update.post}/>
              })}
          </div>
          <div className="hidden xl:block col-span-1">
            <div className="bg-white rounded-lg p-2 m-5 shadow">
              <img className="h-16 w-16 rounded-full mx-auto" src="images/defaultavatar.jpg" />
              <div className="text-center">
                <div className="text-lg">{user.name}</div>
                <textarea className="text-sm bg-gray-200 rounded w-100 resize-none " cols="30" rows="5" maxlength="300" value={updateInput} onChange={handleUpdate}></textarea>
                <div className="text-sm ">Character Limit: {maxInput}</div> 

                <button className="text-sm bg-gray-200 rounded p-2">Update</button>
              </div>
            </div>
          </div>
        </div>
        
      </>
    )
}
