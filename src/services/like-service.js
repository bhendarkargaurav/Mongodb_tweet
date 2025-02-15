
import { LikeRepository, TweetRepository } from '../repository/index.js';

// console.log('likes is', like)
class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        console.log(modelId, modelType, userId);
        if(modelType == 'Tweet') {
            var likeable = await this.tweetRepository.find(modelId);

           

        } else if(modelType == 'Comment') {
            //ToDo

        } else {
            throw new Error('unknown model type');
        }
// there is a logic about like:
 // if user already liked then removed like if user first time like then like
        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });


       
        console.log('exists', typeof(exists));
         if(exists) {
            likeable.likes.pull(exists.id); // uncomment it #problem
            await likeable.save();
            await exists.deleteOne();       // uncomment it  #Problem
            

            var isAdded = false;

         }else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
             // Add the like
            likeable.likes.push(newLike);    // 1 error this is a error will solve it
            // Save the updated tweet
            await likeable.save();

            var isAdded = true;
         }
         return isAdded;
    

}

}

export default LikeService;