import CrudRepository from "./crud-repository.js";
import Comment from '../models/comment.js';
class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    // async create(data){
    //     try {
    //         const comment = await Comment.create(data);
    //         return comment;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

export default CommentRepository;