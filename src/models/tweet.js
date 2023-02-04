const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        max: [250, 'Tweet limit exceeded']
    },
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]
}, {timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;