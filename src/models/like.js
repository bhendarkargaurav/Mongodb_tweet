import mongoose from 'mongoose';

// there is a structure of following coding
// like model is ready
// this is areal writing schema
const likeSchema = new mongoose.Schema({
    // on which model we are going to like
    // or we are going to like on multiple tweet or like on comment
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    likeable: {
        // whenever we loke a comment or like a tweet we need to store their id
        // if like on tweet, tweet id will store, if comment, comment id will store
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {Timestamps: true});

const Like = mongoose.model('Like', likeSchema);

export default Like;