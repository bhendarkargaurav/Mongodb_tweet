import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }
    // creating a comment
    async create(modelId, modelType, userId, content) {
        if(modelType == 'Tweet') {
            console.log("inside model type");
            var commentable = await this.tweetRepository.get(modelId); //1
           console.log(commentable);
        }
        else if(modelType == 'Comment') {
            var commentable = await this.commentRepository.get(modelId);//1
        }else {
            throw new Error('Unknown model type');
        }
        

        const comment = await this.commentRepository.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: [] // new comment array
        });
        commentable.comments.push(comment);
        await commentable.save();

        return comment;
    }
}

export default CommentService;