import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    onmodel: {  // onmodel tell us that comment was made on a tweet and comment was maide on a comment
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']// comnment on a tweet or comment on a comment only
    }, 
    commentable: {// like likeable
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // comments: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
    // }

}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;

