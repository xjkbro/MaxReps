const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const passportConfig = require('../passport')
require('dotenv').config();

const User = require('../models/User')
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
        const { _id, email } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true})
        res.status(200).json({
            isAuthenticated: true, 
            user: {
                email
            }
        })
    }
})

userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req,res) => {
    res.clearCookie('access_token')
    res.json({user: {email: ""}, success: true})

})


userRouter.post('/exercise', passport.authenticate('jwt', {session: false}), (req,res) => {
    const exercise = new Excercise(req.body)
    exercise.save(err => {
        if(err)
            res.status(500).json({msg: "Error has occured", msgErr: true})
        else {
            req.user.exercise.push(exercise)
            req.user.save(err => {
                if(err)
                res.status(500).json({msg: "Error has occured", msgErr: true})
                else
                res.status(200).json({msg: "Exercise Added", msgErr: true})
            })
        }
    })

})

userRouter.get('/exercises', passport.authenticate('jwt', {session: false}), (req,res) => {
    User.findById({_id : req.user._id}).populate('exercise').exec((err,doc) => {
        if(err)
            res.status(500).json({msg: "Error has occured", msgErr: true})
        else{
            res.status(200).json({exercise: doc.exercise, authenticated: true})
        }

    })

})

userRouter.get('/exercises', passport.authenticate('jwt', {session: false}), (req,res) => {
    User.findById({_id : req.user._id}).populate('exercise').exec((err,doc) => {
        if(err)
            res.status(500).json({msg: "Error has occured", msgErr: true})
        else{
            res.status(200).json({exercise: doc.exercise, authenticated: true})
        }

    })

})


//Sync states from back end and front end to keep state when browser restart
userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {email} = req.user
    res.status(200).json({isAuthenticated: true, user: {email}})

})

module.exports = userRouter