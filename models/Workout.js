const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const WorkoutSchema = new Schema({
    list: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
    logged_date: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Workout', WorkoutSchema);