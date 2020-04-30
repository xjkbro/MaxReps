export default {
    getUpdates : ()=>{            // haha its actually a post
        return fetch('/social/posts')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "Unauthorized", msgError : true}};
                });
    },
    getUser : (data) =>{
        return fetch('/social/findUser',{
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
                return {message : {msgBody : "Unauthorized"}, msgError : true};
        });
    },
    postUpdate : (data) =>{
        return fetch('/social/post',{
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
                return {message : {msgBody : "Unauthorized"}, msgError : true};
        });
    },
    // deleteExercise : (id) => {
    //     fetch('/user/exercise/' + id, {
    //     method: 'DELETE',
    //     })
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    // }
}