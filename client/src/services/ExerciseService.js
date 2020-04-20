import Exercise from "../components/Private/Exercises";

export default {
    wgerRequest : async () => {
        let next = 'https://wger.de/api/v2/exercise/'
        let exercises = []
        while(next !== null) {
            await fetch(next)
                .then(res => {
                    return res.json() 
                })
                .then(res => {
                    // console.log(res)
                    next = res.next
                    // console.log(next)
                    const arr = res.results
                    // console.log(arr)
                    arr.forEach((item, index) => {
                        exercises.push(item.name)
                        // console.log(item.name)
                    })
                })
        }
        // console.log(exercises)
        return exercises
    },
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
    postExercise : (data) =>{
        return fetch('/user/exercise',{
            method : "post",
            body : JSON.stringify(data),
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