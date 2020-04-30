// const express = require('express')
// const exerciseRouter = express.Router()
// const passport = require('passport')
// const jwt = require('jsonwebtoken')

// const passportConfig = require('../passport')
// require('dotenv').config();

// const User = require('../models/User')
// const Workout = require('../models/Workout')
// const Exercise = require('../models/Exercise')


// exerciseRouter.post('/list', passport.authenticate('jwt', {session: false}), (req,res) => {
//     const {user, date, name, reps} = req.body
//     const {workouts} = req.user;
//     const exercise = new Exercise({
//         name,
//         reps
//     })

//     User.findById({"_id": req.user._id}, (err, userData) => {
//         const ids = userData.workouts
//         let workout = null

//         if(ids.length == 0) {
//             workout = new Workout({"list": exercise, "logged_date": date})
//             workout.save((err) => {
//                 if(err)
//                     res.status(500).json({msg: "Error has occured", msgErr: true})
//                 else {
//                     userData.workouts.push(workout)
//                     userData.save(err => {
//                         if(err)
//                         res.status(500).json({msg: "Error has occured", msgErr: true})
//                         else
//                         res.status(200).json({msg: "Creates new day log and added first exercise..", msgErr: true})
//                     })
//                 }
//             })
//         }
//         else {
            
//             Workout.findOne({_id: {$in: ids}, logged_date: date}).exec((err,workoutData) => { 
        
//                 if(workoutData == null) {
                    
//                     workout = new Workout({"list": [], "logged_date": date})
//                     exercise.save()

//                     workout.list.push(exercise)
                    
//                     workout.save((err) => {
//                     if(err){
//                         res.status(500).json({msg: "Error has occured", msgErr: true})                    
//                     }
//                     else {
//                         userData.workouts.push(workout)
//                         console.log(workout);
                        
//                         userData.save(err => {
//                             if(err)
//                             res.status(500).json({msg: "Error has occured", msgErr: true})
//                             else
//                             res.status(200).json({msg: "Creates Added", msgErr: true})
//                         })
//                     }
//                     })
//                 }
                    
//                 else {
//                     Workout.findById({"_id": workoutData._id}, (err, workData) => {
//                         exercise.save((err) => {
//                             if(err)
//                                 res.status(500).json({msg: "Error has occured", msgErr: true})
//                             else {
//                                 workData.list.push(exercise)
//                                 workData.save(err => {
//                                     if(err)
//                                     res.status(500).json({msg: "Error has occured", msgErr: true})
//                                     else
//                                     res.status(200).json({msg: "Exercise Added", msgErr: true})
//                                 })
//                             }
//                         })
//                     })
//                 }
//             })            
//         }
//     })
// })

exerciseRouter.post('/post', passport.authenticate('jwt', {session: false}), (req,res) => {
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

exerciseRouter.delete('/del/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

    Exercise.findById(req.params.id)
    .then(exercise => exercise.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})


module.exports = exerciseRouter
