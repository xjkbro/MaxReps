const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')

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



// @route   POST api/auth
// @desc    Authenticate User
// @access  Public
router.post('/', (req,res) => {
    const { email, password} = req.body
    
    //simple validation 
    if( !email || !password)
        return res.status(400).json({msg: "All fields required"})

    // Check for exisiting user
    User.findOne({ email })
    .then(user => {
        if(!user) return res.status(400).json({msg: "User Does Not exists"})

        // Validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
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