const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const passportConfig = require('../passport')
require('dotenv').config();

const User = require('../models/User')
const Workout = require('../models/Workout')
const Excercise = require('../models/Exercise')


const signToken = (id) => {
    return jwt.sign(
        { iss: "JKBro", sub: id }, 
        process.env.JWTSECRET, 
        { expiresIn: "1h"}
    )
}

userRouter.post('/register', (req, res) => {
    const {name, email, password, confirm} = req.body
    
    if(!name || !email || !password || !confirm)
        return res.status(400).json({msg: "All fields required", msgErr: true})
    if(password != confirm)
        return res.status(400).json({msg: "Password and Confirm Password are not the same", msgErr: true})
    
    User.findOne({email}, (err,user) => {
        if(err)
            res.status(500).json({msg: "Error has occured", msgErr: true})
        if(user)
            res.status(400).json({msg: "E-mail already exists", msgErr: true})
        else {
            const newUser = new User({
                name,
                email,
                password
            })
            newUser.save((err,created) => {
                if(err)
                    res.status(500).json({msg: "Error has occured", msgErr: true})
                else{
                    res.status(201).json({msg: "Account successfully created", msgErr: false})
                    // console.log(created);
                }
            })
        }
    })
})

userRouter.post('/login', passport.authenticate('local', {session: false}), function(req,res) {
    if(req.isAuthenticated()) {    
        const { _id, name, email } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true})
        res.status(200).json({
            isAuthenticated: true, 
            user: {
                name,
                email
            }
        })
    }
})

userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req,res) => {
    res.clearCookie('access_token')
    res.json({user: {name: "", email: ""}, success: true})

})


// userRouter.post('/exercise', passport.authenticate('jwt', {session: false}), (req,res) => {
//     const exercise = new Excercise(req.body)
//     exercise.save(err => {
//         if(err)
//             res.status(500).json({msg: "Error has occured", msgErr: true})
//         else {
//             req.user.exercise.push(exercise)
//             req.user.save(err => {
//                 if(err)
//                 res.status(500).json({msg: "Error has occured", msgErr: true})
//                 else
//                 res.status(200).json({msg: "Exercise Added", msgErr: true})
//             })
//         }
//     })

// })

userRouter.post('/exercise', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {user, date, name, reps} = req.body
    const {workouts} = req.user;

    // console.log(date);
    // console.log(name);
    // console.log(reps);

    // console.log("UserData:" + req.user);

    const exercise = new Excercise({
        name,
        reps
    })

    // console.log(req.user.workouts);
    // console.log(user);
    User.findById({"_id": req.user._id}, (err, userData) => {
        const ids = userData.workouts
        console.log(ids)
        console.log(userData)
        let workout = null

        if(ids.length == 0) {
            workout = new Workout({"list": exercise, "logged_date": date})
            workout.save((err) => {
                if(err)
                    res.status(500).json({msg: "Error has occured", msgErr: true})
                else {
                    userData.workouts.push(workout)
                    userData.save(err => {
                        if(err)
                        res.status(500).json({msg: "Error has occured", msgErr: true})
                        else
                        res.status(200).json({msg: "Creates new day log and added first exercise..", msgErr: true})
                    })
                }
            })
            console.log("from if")
        }
        else {
            console.log(ids);
            console.log(date);
            
            Workout.findOne({_id: {$in: ids}, logged_date: date}).exec((err,workoutData) => { 
                console.log("workdata: "+ workoutData)
                

                if(workoutData == null) {
                    workout = new Workout({"list": exercise, "logged_date": date})
                    workout.save((err) => {
                    if(err)
                        res.status(500).json({msg: "Error has occured", msgErr: true})
                    else {
                        userData.workouts.push(workout)
                        userData.save(err => {
                            if(err)
                            res.status(500).json({msg: "Error has occured", msgErr: true})
                            else
                            res.status(200).json({msg: "Creates Added", msgErr: true})
                        })
                    }
                    })
                }
                else {
                    console.log("workdataID: "+ workoutData._id)
                    Workout.findById({"_id": workoutData._id}, (err, workData) => {
                        exercise.save((err) => {
                            if(err)
                                res.status(500).json({msg: "Error has occured", msgErr: true})
                            else {
                                workData.list.push(exercise)
                                workData.save(err => {
                                    if(err)
                                    res.status(500).json({msg: "Error has occured", msgErr: true})
                                    else
                                    res.status(200).json({msg: "Exercise Added", msgErr: true})
                                })
                            }
                        })
                    })
                    console.log("userData: "+ userData)
                    




                    // workout.save((err) => {
                    //     if(err)
                    //         res.status(500).json({msg: "Error has occured", msgErr: true})
                    //     else {
                    //         userData.workouts.push(workout)
                    //         userData.save(err => {
                    //         if(err)
                    //             res.status(500).json({msg: "Error has occured", msgErr: true})
                    //         else
                    //             res.status(200).json({msg: "Exercise Added", msgErr: true})
                    //         })
                    //         exercise.save((err) => {
                    //             if(err)
                    //                 res.status(500).json({msg: "Error has occured", msgErr: true})
                    //             else {
                    //                 workoutData.list.push(exercise)
                    //                 workoutData.save(err => {
                    //                     if(err)
                    //                     res.status(500).json({msg: "Error has occured", msgErr: true})
                    //                     else
                    //                     res.status(200).json({msg: "Exercise Added", msgErr: true})
                    //                 })
                    //             }
                    //         })
                    //     }
                    // })
                }
                console.log("from else")
            })            
        }

        // req.user.workouts.push(workout)
        //     console.log(workout)
        //     console.log(workout._id)
        //     workout.save()
        //     Workout.find({_id: workout._id, logged_date: date}).exec((err,data) => { 
        //         console.log(data);
                
        //     })
        //     exercise.save()
        
        
        
            // Workout.find({_id: {$in: ids}, logged_date: date}).exec((err,data) => {
        //     const ob = data
        //     console.log(ob);
        //     if(err)
        //         console.log("akjsdl")
        //     else
        //         console.log("sklasd");
            

            // exercise.save((err) => {
            //     if(err){
            //         const wo = new Workout({"list": exercise, "logged_date": date})
            //         wo.save((err)=> {

            //         })

            //     }
            //     else {
            //         console.log(data);
            //         // data.list.push(exercise)
            //         // console.log(data)
            //         // exercise.save()
            //     }
            // })
            // // .save()
            // console.log(d.list);
            // exercise.save(err => {
            //     if(err){
            //         const workout = new Workout({})
            //         workout.save()
            //     }
            // })
            
        // })
    })
    
    // const q = User.findById({"_id": req.user._id})
    // q.where('workouts').find((err, data) => {
    //     const ids = req.user.workouts
    //     console.log(ids)

    //     w = Workout.find().where('_id').in(ids).exec((err,data) => {
    //         console.log(data)

    //     })
    // })

    // exercise.save((err,data) => {
    //     if(err)
    //         res.status(500).json({msg: "Error has occured", msgErr: true})
    //     else {
    //         Workout.findOne({"logged_date": date}, (err, workoutArray)=> {
    //             if(err) {
    //                 const workout = new Workout({"list": exercise, "logged_date": date})
    //                 workout.save(err => {
    //                     if(err)
    //                         res.status(500).json({msg: "Error has occured", msgErr: true})
    //                     else {
    //                         req.user.workout.push(workout)
    //                         req.user.save(err => {
    //                             if(err)
    //                             res.status(500).json({msg: "Error has occured", msgErr: true})
    //                             else
    //                             res.status(200).json({msg: "Exercise Added", msgErr: true})
    //                         })
    //                     }
    //                 })

    //             }
    //             else {
    //                 console.log("Hello " + workoutArray.workouts)
    //                 workoutArray.list.push(exercise)
    //                 console.log("no helo "+ workoutArray.workouts)
    //                 req.user.save()
    //                 console.log("no helo "+ workoutArray.workouts)

    //             }
    //             console.log(workoutArray)


    //         })
    //         console.log(res.use);
            
    //         console.log(data);
            
    //         // Workout.findById(req.user.workout).
    //         // req.user.exercise.push(exercise)
    //         // req.user.save(err => {
    //         //     if(err)
    //         //     res.status(500).json({msg: "Error has occured", msgErr: true})
    //         //     else
    //         //     res.status(200).json({msg: "Exercise Added", msgErr: true})
    //         // })
    //     }
    // })

    // console.log(req.user.workouts)
    // const workout = new Workout({"list": exercise, "logged_date": date})
    
    // console.log("Exercise: " + exercise);
    // console.log("Workout: " + workout);


    // exercise.save(err => {
    //     if(err)
    //         res.status(500).json({msg: "Error has occured", msgErr: true})
    //     else {
    //         req.user.workouts.exercise.push(exercise)     
    //         req.user.workouts.save(err => {
    //             if(err)
    //                 res.status(500).json({msg: "Error has occured", msgErr: true})
    //             else {
    //                 req.user.workouts.push(workout)
    //                 req.user.save(err => {
    //                     if(err)
    //                         res.status(500).json({msg: "Error has occured", msgErr: true})
    //                     else
    //                         res.status(200).json({msg: "Workout Added", msgErr: true})
    //                 })
    //             }
    //         })
    //     }
    // })

    // workout.save(err => {
    //     if(err)
    //         res.status(500).json({msg: "Error has occured", msgErr: true})
    //     else {
    //         req.user.workouts.push(workout)
    //         req.user.save(err => {
    //             if(err)
    //             res.status(500).json({msg: "Error has occured", msgErr: true})
    //             else
    //             res.status(200).json({msg: "Exercise Added", msgErr: true})
    //         })
    //     }
    // })

    // User.findById({_id : userID}, (err, data)=> {
    //     if(err)
    //         res.status(500).json({msg: "Error has occured", msgErr: true})
    //     else {
    //         Workout.findOne({workoutDate})
    //     }
    // })
    


    
    // exercise.save(err => {
    //     if(err)
    //         res.status(500).json({msg: "Error has occured", msgErr: true})
    //     else {
    //         req.user.exercise.push(exercise)
    //         req.user.save(err => {
    //             if(err)
    //             res.status(500).json({msg: "Error has occured", msgErr: true})
    //             else
    //             res.status(200).json({msg: "Exercise Added", msgErr: true})
    //         })
    //     }
    // })

})

userRouter.get('/exercises', passport.authenticate('jwt', {session: false}), (req,res) => {
    User.findById({_id : req.user._id}).populate('workouts').exec((err,doc) => {
        if(err)
            res.status(500).json({msg: "Error has occured", msgErr: true})
        else{
            res.status(200).json({workoutDate: doc.workoutDate, authenticated: true})
        }
    })
})

//Sync states from back end and front end to keep state when browser restart
userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {_id,name,email,workouts} = req.user

    res.status(200).json({isAuthenticated: true, user: {_id,name,email,workouts}})
})

//Authorized routes for changing database
userRouter.post('/newName', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {_id} = req.user
    const {name} = req.body
    User.updateOne({_id: _id}, {name: name})
        .then(()=>(res.status(200)))
})

userRouter.post('/newEmail', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {_id} = req.user
    const {email} = req.body
    User.updateOne({_id: _id}, {email: email})
        .then(()=>(res.status(200)))
})

module.exports = userRouter