import { polls } from "@/server-logic/db/setup";
import { ObjectId } from "mongodb";
import { ObjectType } from "typescript";

interface Comment {
    comment: string,
    createdBy: ObjectId,
    pollId: ObjectId
}

export default class CommentManager {
   
    static async new (input: Comment){
        // TODO add reply featuer 
        return await polls.updateOne(
            {_id: input.pollId},
            {$push: {comments: { createdBy: input.createdBy, comment: input.comment, date: new Date() }}} 
        )
    }
    static async getCommentsWithOffset(offset: number, pollId: ObjectId) {
        const aggregationResult = await polls.aggregate([
          {
            $match: { _id: pollId}
          },
          {
            $project: {
              comments: { $slice: ["$comments", offset, 10] }
            }
          }
        ]).toArray();
        return aggregationResult[0].comments  
    }
    static async deleteComment (pollId: ObjectId, commentId: ObjectId){
        return await polls.deleteOne(
            {_id: pollId, 'comment.id': commentId}
        )
    }
}