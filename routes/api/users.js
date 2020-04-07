const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')

require('dotenv').config();

//User Model
const User = require('../../models/User')

router.get('/login', (req,res) => {
    res.send('Login Page')
})

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', (req,res) => {
    const {name , email, password} = req.body
    
    //simple validation 
    if(!name || !email || !password)
        return res.status(400).json({msg: "All fields required"})

    // Check for exisiting user
    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: "User already exists"})

        const newUser = new User({
            name,
            email,
            password
        })

        // Create salt & hash
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(newUser.password, salt , (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {


                        // sign params
                        // [0] payload so the user
                        // [1] a secret key
                        // [2] expiration
                        // [3] a call back that recieves a error and token
                        jwt.sign( 
                            { id: user.id },
                            process.env.JWTSECRET, 
                            { expiresIn: 3600}, 
                            (err, token) => {
                                if(err) throw err;
                                
                                res.json({
                                    token,              //responding the generated token
                                    user : {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }})
                            }  
                        
                        )

                        
                    })
            })
        })

    })
})

module.exports = router;