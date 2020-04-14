const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy

const User = require('./models/User')
require('dotenv').config();


const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['access_token']
    }
    return token
}

//authorization
passport.use(new jwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWTSECRET
},(payload, done) => {
    User.findById({ _id: payload.sub}, (err,user) => {
        console.log(user);
        
        if(err)
            return done(err,false)
        if(user)
            return done(null, user)
        else
            return done(null, false)
    })
}))

//authenticated local strategy using email and pass
passport.use(new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    (email,password,done) => {

    // validation
    if( !email || !password)
        return res.status(400).json({msg: "All fields required"})

    User.findOne({email}, (err,user) => {
        //something went wrong with database
        if(err)
            return done(err);
        if(!user)
            return done(null, false)
        //checks password if correct
        user.comparePassword(password, done)
    })    
}))