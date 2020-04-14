const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    exercise: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
    register_date: {
        type: Date,
        default: Date.now
    }
});
// Basically Mongoose's version of middleware
UserSchema.pre('save', function(next){
    //checks for hashing has been done by brcrypt
    if(!this.isModified('password'))
        return next()
    bcrypt.hash(this.password, 10, (err,passwordHash) => {
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    })
})

UserSchema.methods.comparePassword = function(password, cb){
    
    bcrypt.compare(password, this.password, (err,isMatch)=>{
        if(err)
            return cb(err)
        else{
            if(!isMatch)
                return cb(null, isMatch)
            return cb(null, this)
        }
    })
}

module.exports = mongoose.model('User', UserSchema);