import Tweet from '../models/tweet.js'
import CrudRepository from './crud-repository.js';

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }
    
    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    async getWithComments(id) { // fetch a tweet along with its comments 
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments',
                populate: {
                    path: 'comments'
                }
            }).lean(); // Convert Mongoose document to plain JSON object
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(offset, limit) {       // page innation
        try {
            const tweet = await Tweet.find()
            .skip(offset)
            .limit(limit);
        return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async find(id) { // find a tweet to populate the who liked the tweet.
        try {
            const tweet = await Tweet.findById(id).populate({path: 'likes'});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepository;