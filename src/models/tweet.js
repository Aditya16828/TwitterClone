const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        max: [250, 'Tweet limit exceeded']
    },
    userEmail:{
        type: String,
        required: true
    },
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]
}, {timestamps: true});

// tweetSchema.virtual('contentCreator').get(function process(){
//     return `${this.content} \nCreated by: ${this.userEmail}`;
// })

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;