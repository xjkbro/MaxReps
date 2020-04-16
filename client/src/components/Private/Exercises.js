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
  
    useEffect(()=>{
        ExerciseService.getExercises().then(data =>{
            setExercises(data.exercise);
        });
    },[]);

    console.log(exercises)
    return (
      <>
      <Navbar />
      <div className="container p-6">
        <ul className="">
                { 
                    exercises.map(exercise =>{
                        return <SingleExercise key={exercise._id} exercise={exercise}/>
                    })
                }
            </ul>
      </div>
      </>
    )
}
