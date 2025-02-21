
import { LikeRepository } from '../repository/index.js';

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async toggleLike(likeable, modelType, userId) {
        // Find if the user has already liked this model (Tweet or Comment)
        const existingLike = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: likeable._id // Use the _id directly from the fetched document
        });

        if (existingLike) {
            // Remove the like
            likeable.likes.pull(existingLike.id);
            await likeable.save();
            await existingLike.deleteOne(); // Remove like from the database
            return { isLiked: false };
        } else {
            // Add new like
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: likeable._id // Use _id from the likeable object
            });
            likeable.likes.push(newLike); // Add to tweet/comment's likes
            await likeable.save();
            return { isLiked: true };
        }
    }
}

export default LikeService;
