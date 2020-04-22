import React, {useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'

import '../../style.css';
import Navbar from './Navbar'
import Update from './Update'


// import avatar from '../../../public/images/defaultavatar.jpg';


export default function Dashboard() {

  const {user} = useContext(AuthContext)
  const updates = [
    {id: "0", name: "Jack",day:"4/10/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },
    {id: "1", name: "Mary",day:"4/20/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },
    {id: "2", name: "Luis",day:"4/21/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },
    {id: "3", name: "Patrick",day:"4/14/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },
    {id: "4", name: "Bob",day:"4/11/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },
    {id: "5", name: "Annabelle",day:"4/13/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },
    {id: "6", name: "Jessica",day:"4/15/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },
    {id: "7", name: "Gabriella",day:"4/22/20", msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cupiditate libero a quos ipsa modi culpa repellat, voluptate at mollitia iusto. Consequuntur neque rem soluta ab, labore ducimus necessitatibus!" },

  ]
  const [maxInput, setMaxInput] = useState(300)
  const [updateInput, setUpdateInput] = useState("")


  const handleUpdate =(e) => {
    const val = updateInput.length - e.target.value.length
    setUpdateInput(e.target.value)
    console.log(updateInput)
    setMaxInput(maxInput+val)
    console.log(maxInput)




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
                  <textarea className="text-sm bg-gray-200 rounded md:w-100" rows="2" maxlength="300" value={updateInput} onChange={handleUpdate}></textarea>
                  <div className="text-sm ">Character Limit: {maxInput}</div> 

                  <button className="text-sm bg-gray-200 rounded p-2">Update</button>
                </div>
              </div>
          </div>

          <div className="col-span-3">
              {updates.map(update=> {
                return <Update key={update.id} name={update.name} day={update.day} msg={update.msg}/>
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
