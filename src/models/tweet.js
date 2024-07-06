
import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet cannot be more than 250 character']
    },
    // Tweet can have many likes
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
        // ref: 'User'
    }
}, {timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;

