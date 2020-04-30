import React, {useState,useContext,useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'
import ExerciseService from '../../services/ExerciseService'


import '../../style.css';
import Navbar from './Navbar'
import SingleExercise from './SingleExercise';
import { set } from 'mongoose';

export default function Exercise(props) {
    const [exercise,setExercise] = useState({name : ""});
    const [exercises,setExercises] = useState([]);
    const [getExercise,setGetExercise] = useState(false);
    const authContext = useContext(AuthContext)

    const [maxSets, setMaxSets] = useState(3)
    const [setsArray, setSetsArray] = useState([0,1,2])

    const [dynamicClass, setDynamicClass] = useState("")
    const today = new Date();
    const newDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)) 
    const [inputDate, setInputDate] = useState(newDate.toJSON().slice(0,10))

    const [inputName, setInputName] = useState("")
    const [inputSet1, setInputSet1] = useState()
    const [inputSet2, setInputSet2] = useState()
    const [inputSet3, setInputSet3] = useState()
    const [inputSet4, setInputSet4] = useState()
    
    const [inputData, setInputData] = useState(null)
    const [populateData, setPopulateData] = useState(true)
  
    useEffect(()=>{
        console.log("LOADING FOR:" + inputDate)
        LoadExercise()
    },[inputDate]);

    const LoadExercise =()=> {
        const data = {
            "date": inputDate
        }
        ExerciseService.getExercises(data)
        .then((data) =>{
            console.log(data);
            if (data.isPopulated){
                setPopulateData(true)
                setExercises(data.data);
            }
            else
                setPopulateData(false)
        });
    }

    const handleDate = async (e) => {
        setInputDate(e.target.value)
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

    const submitWorkout = async (e) => {
        e.preventDefault()
        console.log(inputData);
        await ExerciseService.postExercise(inputData)
        LoadExercise()
        setInputName("")
        setInputSet1("")
        setInputSet2("")
        setInputSet3("")
        setInputSet4("")
    }
    

    return (
      <>
      <Navbar />
      <div className="container p-6 h-6/12">
        <div>
            <span className="text-5xl"> Exercises </span>
            <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-2" type="date" value={inputDate} onChange={handleDate} />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-12 gap-4 container mx-auto p-6">
            <label className="text-left text-sm col-span-1"></label>
            <label className="text-left text-sm col-span-7">Name</label>
            <label className="text-left text-sm col-span-1">Set 1</label>
            <label className="text-left text-sm col-span-1">Set 2</label>
            <label className="text-left text-sm col-span-1">Set 3</label>
            <label className="text-left text-sm col-span-1">Set 4</label>
        </div>
        <div>
                { populateData == true && exercises.length != 0 ? 
                    exercises.map(exercise =>{
                        // return <SingleExercise key={exercise._id} reps={exercise.reps} name={exercise.name}/>
                        return (
                            <>
                                <span className="grid grid-cols-12 gap-4 container mx-auto px-6 py-2 hover:bg-gray-500">
                                    <button className="text-center font-black text-sm col-span-1 text-red-700" 
                                            onClick={(e)=> {
                                                    ExerciseService.deleteExercise(exercise._id)
                                                    LoadExercise()
                                                    }
                                            }> x </button>
                                    <span className="text-left font-light text-sm col-span-7">{exercise.name}</span>
                                    <span className="text-left font-light text-sm col-span-1">{exercise.reps[0]}</span>
                                    <span className="text-left font-light text-sm col-span-1">{exercise.reps[1]}</span>
                                    <span className="text-left font-light text-sm col-span-1">{exercise.reps[2]}</span>
                                    <span className="text-left font-light text-sm col-span-1">{exercise.reps[3]}</span>
                                </span>
                            </>
                        )
                    })           
                    : 
                    <div className="grid grid-cols-6 gap-4 container mx-auto p-6">
                        <p className="text-left text-sm bg-red-100 col-span-7 border-0 border-red-500 p-2" >No Entries</p>
                    </div>          
                }
        </div>
        
        <form  onSubmit={submitWorkout}>
            <div className="grid grid-cols-6 gap-4 container mx-auto p-6">

                <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-2" type="name" placeholder="Bench Press" value={inputName} onChange={(e)=>{setInputName(e.target.value)}} />
                <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet1} onChange={(e)=>{setInputSet1(e.target.value)}}/>
                <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet2} onChange={(e)=>{setInputSet2(e.target.value)}}/>
                <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet3} onChange={(e)=>{setInputSet3(e.target.value)}}/>
                <input className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-1" type="number" placeholder="0" value={inputSet4} onChange={(e)=>{setInputSet4(e.target.value)}}/>
                
            <button className="block md:hidden bg-gray-200 rounded col-span-6"> Submit </button>
            </div>
            
        </form>
      </div>
      </>
    )
}
