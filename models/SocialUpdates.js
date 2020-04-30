const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const SocialUpdatesSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('SocialUpdates', SocialUpdatesSchema);