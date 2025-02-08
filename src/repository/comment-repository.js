// import CrudRepository from "./crud-repository.js";
// import Comment from '../models/comment.js';
// class CommentRepository extends CrudRepository {
//     constructor() {
//         super(Comment);
//     }

//     // async create(data){
//     //     try {
//     //         const comment = await Comment.create(data);
//     //         return comment;
//     //     } catch (error) {
//     //         throw error;
//     //     }
//     // }
// }

// export default CommentRepository;

import Comment from "../models/comment.js";
import CrudRepository from "./crud-repository.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    /**
     * Method to find comments based on the `commentable` field.
     * This can be used to get all comments for a specific Tweet or Comment.
     * 
     * @param {ObjectId} commentableId - The ID of the Tweet or Comment the comments are related to.
     * @returns {Promise<Array>} - A promise that resolves to an array of comments.
     */
    async findCommentsFor(commentableId) {
        try {
            const comments = await this.model.find({ commentable: commentableId }).populate('userId').populate('comments');
            return comments;
        } catch (error) {
            console.error("Error in CommentRepository: findCommentsFor", error);
            throw error;
        }
    }

    /**
     * Method to add a nested comment to an existing comment.
     * 
     * @param {ObjectId} commentId - The ID of the comment to add a nested comment to.
     * @param {Object} data - The data for the nested comment.
     * @returns {Promise<Object>} - A promise that resolves to the updated comment.
     */
    async addNestedComment(commentId, data) {
        try {
            const nestedComment = await this.create(data); // Creates the nested comment first
            const updatedComment = await this.model.findByIdAndUpdate(
                commentId,
                { $push: { comments: nestedComment._id } }, // Adds the nested comment to the parent comment's `comments` array
                { new: true }
            ).populate('comments'); // Optionally populate the nested comments
            return updatedComment;
        } catch (error) {
            console.error("Error in CommentRepository: addNestedComment", error);
            throw error;
        }
    }
}

export default CommentRepository;
