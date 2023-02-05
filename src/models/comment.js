const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentableId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'onModel',
            required: true
        }
    ],
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;