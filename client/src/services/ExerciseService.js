import Exercise from "../components/Private/Exercises";

export default {
    getExercises : ()=>{
        return fetch('/user/exercises')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized", msgError : true}};
                });
    },
    postExercise : exercise=>{
        return fetch('/user/exercise',{
            method : "post",
            body : JSON.stringify(exercise),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"}, msgError : true};
        });
    }
}