import { polls } from "@/db/setup";
import { ObjectId } from "mongodb";

interface Comment {
    content: string,
    userId: ObjectId,
    pollId: ObjectId
}

export default class CommentManager {
    static async addCommnet (input: Comment){
        // TODO add reply featuer 
        return await polls.updateOne(
            {_id: input.pollId},
            {$push: {comments: { id: input.userId, content: input.content, date: new Date() }}} 
        )
    }
    static async deleteComment (pollId: ObjectId, commentId: ObjectId){
        return await polls.deleteOne(
            {_id: pollId, 'comment.id': commentId}
        )
    }
}