const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    reps: {
        type: Array,
        required: true
    }
});


module.exports = mongoose.model('Exercise', ExerciseSchema);