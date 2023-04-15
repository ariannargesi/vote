import { polls } from "@/db/setup";
import { ObjectId } from "mongodb";

enum Operator {
    Plus,
    Minus 
}

export default class VoteManager {
    static vote(input: { pollId: ObjectId, userId: ObjectId, selectedOption: number }) {
        return polls.updateOne(
            { _id: input.pollId },
            { $push: { votes: { id: input.userId, value: input.selectedOption } } }
        )
    }
    static async isAlreadyVoted(userId: ObjectId, pollId: ObjectId){
        const queryResult = await polls.findOne({
            _id: pollId,
            'votes.id': userId
        })
        if(queryResult) return true 
        else return false 
    }

}

