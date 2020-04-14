const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')

//AUTHENTICATION MIDDLEWARE
const auth = require('../../middleware/auth')

// Bring in JWT SECRET
require('dotenv').config();
console.log('from user' + process.env.JWTSECRET)

//User Model
const User = require('../../models/User')

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

// @route   POST api/auth/register
// @desc    Register User
// @access  Public
router.post('/register', (req,res) => {
    const { name , email, password, confirm } = req.body
    
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(confirm)

    //simple validation 

    if(!name || !email || !password || !confirm)
        return res.status(400).json({msg: "All fields required"})
    if(password != confirm)
        return res.status(400).json({msg: "Password and Confirm Password are not the same"})
    
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

// @route   POST api/auth/login
// @desc    Login and Authenticate User
// @access  Public
router.post('/login', async (req,res) => {
    const { email, password} = req.body
    console.log(email);
    console.log(password);

    
    //simple validation 
    if( !email || !password)
        return res.status(400).json({msg: "All fields required"})


    try {


    }
    catch (err) {
        
    }
    console.log("hello")
    // Check for exisiting user
    User.findOne({ email })
    .then(user => {
        console.log(user)
        if(!user) return res.status(400).json({msg: "User Does Not exists"})

        // Validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                console.log(password + " " + user.password)
                if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"})
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

module.exports = router;