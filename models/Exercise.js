const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logged_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Exercise', ExerciseSchema);