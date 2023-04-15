import { ObjectId } from "mongodb";
import { polls } from "@/db/setup";
import { Operator } from "@/types";

export default class ScoreManager {
    
    static async isAlreadyScored(pollId: ObjectId, userId: ObjectId){
        const queryResult = await polls.findOne({
            _id: pollId,
            'scores.id': userId
        })
        if(queryResult) return true 
        else return false 
    }
    static async score(input: { pollId: ObjectId, userId: ObjectId, operator: Operator }){
        return await polls.updateOne(
            {_id: input.pollId},
            {$push: {scores: {id: input.userId, operator: input.operator}}}
        )        
    }
}