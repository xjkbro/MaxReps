import React, {useState,useContext,useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'
import ExerciseService from '../../services/ExerciseService'


import '../../style.css';
import Navbar from './Navbar'
import SingleExercise from './SingleExercise';

export default function Exercise(props) {
    const [exercise,setExercise] = useState({name : ""});
    const [exercises,setExercises] = useState([]);
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext)

    const [maxSets, setMaxSets] = useState(3)
    const [setsArray, setSetsArray] = useState([0,1,2])

    const [dynamicClass, setDynamicClass] = useState("")
    const today = new Date();    

    const [inputDate, setInputDate] = useState(today.toJSON().slice(0,10))
    const [inputName, setInputName] = useState("")
    const [inputSet1, setInputSet1] = useState()
    const [inputSet2, setInputSet2] = useState()
    const [inputSet3, setInputSet3] = useState()
    const [inputSet4, setInputSet4] = useState()
    
    const [inputData, setInputData] = useState(null)


    
  
    useEffect(()=>{
        ExerciseService.getExercises().then(data =>{
            setExercises(data.exercise);
        });
    },[exercises]);

    const handleDate = (e) => {
        setInputDate(e.target.value)
        console.log(e.target.value)
    }
    useEffect(() => {
        setInputData({
            user: authContext.user,
            date: inputDate,     
            name: inputName,
            reps: [inputSet1,
                inputSet2,
                inputSet3,
                inputSet4]
        })
    }, [inputDate, inputName, inputSet1, inputSet2, inputSet3, inputSet4])

    const submitWorkout = (e) => {
        e.preventDefault()
        console.log(inputData);
        ExerciseService.postExercise(inputData)
    }

    return (
      <>
      <Navbar />
      <div className="container p-6 h-6/12">
        <div>
            <span className="text-5xl"> Exercises </span>
            <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-2" type="date" value={inputDate} onChange={handleDate} />
        </div>
        {/* <ul className="">
                { 
                    exercises.map(exercise =>{
                        return <SingleExercise key={exercise._id} exercise={exercise}/>
                    })
                }
            </ul> */}
      </div>

      <div>
        <div className="grid grid-cols-7 gap-4 container mx-auto p-6">
            <label className="text-left font-light text-sm col-span-2">Name</label>
            <label className="text-left font-light text-sm col-span-1">Set 1</label>
            <label className="text-left font-light text-sm col-span-1">Set 2</label>
            <label className="text-left font-light text-sm col-span-1">Set 3</label>
            <label className="text-left font-light text-sm col-span-1">Set 4</label>
        </div>
        
        <form className="grid grid-cols-7 gap-4 container mx-auto p-6" onSubmit={submitWorkout}>
            <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-2" type="name" placeholder="Bench Press" value={inputName} onChange={(e)=>{setInputName(e.target.value)}} />
            <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet1} onChange={(e)=>{setInputSet1(e.target.value)}}/>
            <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet2} onChange={(e)=>{setInputSet2(e.target.value)}}/>
            <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet3} onChange={(e)=>{setInputSet3(e.target.value)}}/>
            <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet4} onChange={(e)=>{setInputSet4(e.target.value)}}/>
            <button className="bg-gray-200 rounded col-span-1"> Submit </button>
        </form>
      </div>
      </>
    )
}
