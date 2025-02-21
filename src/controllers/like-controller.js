
import LikeService from '../services/like-service.js';
import { TweetRepository, CommentRepository } from '../repository/index.js';

const likeService = new LikeService();
const tweetRepository = new TweetRepository();
const commentRepository = new CommentRepository();

export const toggleLike = async (req, res) => {
    try {
        // Fetch the likeable model (Tweet or Comment) from the database
        let likeable;

        if (req.query.modelType === 'Tweet') {
            likeable = await tweetRepository.find(req.query.modelId);
        } else if (req.query.modelType === 'Comment') {
            likeable = await commentRepository.find(req.query.modelId);
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid model type',
            });
        }

        // If the likeable entity (Tweet or Comment) doesn't exist, return an error
        if (!likeable) {
            return res.status(404).json({
                success: false,
                message: `${req.query.modelType} not found`,
            });
        }

        // Now that the likeable entity is fetched, pass it to the service
        const userId = req.body.userId; // Assuming userId is coming from the request body

        const response = await likeService.toggleLike(likeable, req.query.modelType, userId);

        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully toggled like'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: error
        });
    }
};
