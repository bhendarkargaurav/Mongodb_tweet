// class TweetRepository extends CrudRepository {
//     constructor() {
//         super(Tweet);
//     }

//     async find(id) {
//         return await this.model.findById(id).populate('likes'); // Ensure likes are populated
//     }
// }

import Like from '../models/like.js';
import CrudRepository from './crud-repository.js';

class LikeRespository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async findByUserAndLikeable(data) {
        try {
            const like = await Like.findOne(data);
            return like;
        } catch(error) {
            throw error;
        }
    }
}

export default LikeRespository;