const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const passportConfig = require('../passport')
require('dotenv').config();

const User = require('../models/User')
const Workout = require('../models/Workout')
const Exercise = require('../models/Exercise')


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
            msg: "Successfully logged in",
            isAuthenticated: true, 
            user: {
                name,
                email
            }
        })
    }
    else {
        res.status(500).json({
            msg: "All fields required",
            isAuthenticated: false, 
            user: null
        })
    }
})

userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req,res) => {
    res.clearCookie('access_token')
    res.json({user: {name: "", email: ""}, success: true})

})


userRouter.post('/exercise', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {user, date, name, reps} = req.body
    const {workouts} = req.user;
    const exercise = new Exercise({
        name,
        reps
    })

    User.findById({"_id": req.user._id}, (err, userData) => {
        const ids = userData.workouts
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
        }
        else {
            
            Workout.findOne({_id: {$in: ids}, logged_date: date}).exec((err,workoutData) => { 
        
                if(workoutData == null) {
                    
                    workout = new Workout({"list": [], "logged_date": date})
                    exercise.save()

                    workout.list.push(exercise)
                    
                    workout.save((err) => {
                    if(err){
                        res.status(500).json({msg: "Error has occured", msgErr: true})                    
                    }
                    else {
                        userData.workouts.push(workout)
                        console.log(workout);
                        
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
                }
            })            
        }
    })
})

userRouter.post('/exercises', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {date} = req.body

    User.findById({"_id": req.user._id}, (err, userData) => {
        const ids = userData.workouts
        let workout = null

        if(ids.length == 0) {
            res.status(200).json({data: {}, isPopulated: false, forDate: date, msg: "Empty Entries", msgErr: true})
        }
        else {
            Workout.findOne({_id: {$in: ids}, logged_date: date}).exec((err,workoutData) => {
                if(workoutData == null) {
                    res.status(200).json({data: {}, isPopulated: false, forDate: date, msg: "Empty Entries", msgErr: true})
                }
                else {
                    console.log("workdataID: "+ workoutData._id)
                    Workout.findById({"_id": workoutData._id}).populate('list').exec((err,doc) => {
                        console.log(doc.list);
                        if(err)
                            res.status(500).json({data: {}, isPopulated: false, forDate: date, msg: "Empty Entries", msgErr: true})
                        else
                            res.status(200).json({data: doc.list, isPopulated: true, forDate: date, msg: "Got Em", msgErr: true})
                    })
                }
            })            
        }
    })
})

userRouter.delete('/exercise/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

    Exercise.findById(req.params.id)
    .then(exercise => exercise.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})

//Sync states from back end and front end to keep state when browser restart
userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {_id,name,email,workouts} = req.user

    res.status(200).json({isAuthenticated: true, user: {_id,name,email}})
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