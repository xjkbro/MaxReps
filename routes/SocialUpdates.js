const express = require('express')
const socialRouter = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const passportConfig = require('../passport')
require('dotenv').config();

const User = require('../models/User')
const SocialUpdates = require('../models/SocialUpdates')

// socialRouter.get('/posts', passport.authenticate('jwt', {session: false}), async (req,res) => {

//     let userIDs = []
//     let socialPromise = SocialUpdates.find().sort({'post_date': -1}).limit(10).exec()
//     socialPromise.then((socialDoc) => {
//         // console.log(socialPromise)
        
        
        
        
        
//         socialDoc.map(update => {
//             userIDs.push(update.userID)
//         }
//             let userPromise = User.findOne({"_id": update.userID}).exec()
//             userPromise.then((user) => {
//                 // console.log(user)
//                 update.name = user.name
//             })  
//         })
//         data = await socialDoc
//         console.log(socialPromise);
//     })
    
    
//     // SocialUpdates.find().sort({'post_date': -1}).limit(10).exec((err, socialDoc) => {
//     //     // console.log(doc)
//     //     let arr = []
//     //     socialDoc.map(data => {
//     //         let promise = User.findOne({"_id": data.userID}).exec((err,doc) => {
//     //             promise.then// console.log(doc);
//     //             data.name = doc.name
//     //             arr.push(doc.name)
//     //         })
//     //         console.log(arr)
//     //     })
        
//     // }).then(data=> console.log(data))

// })

socialRouter.get('/posts', passport.authenticate('jwt', {session: false}), (req,res) => {


    SocialUpdates.find().sort({'post_date': -1}).limit(10).exec(async (err, socialDoc)=> {

        
        if(err)
            res.status(500).json({data: {}, isPopulated: false,  msg: "GOTEM"})
        else
            res.status(200).json({data: socialDoc, isPopulated: true,  msg: "GOTEM"})
    })


})

socialRouter.post('/findUser', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {userID} = req.body
    console.log(userID);
    User.findOne({"_id": userID}).exec((err,doc) => {
        const data= req.body
        data.name = doc.name
        res.status(200).json(data)
    })

})

socialRouter.post('/post', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {date, post} = req.body
    const {_id} = req.body

    const newPost = new SocialUpdates({
        "userID": req.user._id,
        "name": req.user.name,
        "post_date": date,
        "post": post
    })

    User.findById({"_id": req.user._id}, (err, userDoc) => {
        console.log(userDoc);
        
        userDoc.posts.push(newPost)
        newPost.save()
        res.status(200).json({success: true, post: post})

    })
})

module.exports = socialRouter
