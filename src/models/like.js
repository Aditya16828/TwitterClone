const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    onModel:{
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    likedId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;