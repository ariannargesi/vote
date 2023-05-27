import { ObjectId } from "mongodb";
import { polls } from "@/server-logic/db/setup";
import { Operator, Poll,} from "@/types";

export default class ScoreManager {

    static async isAlreadyScored(pollId: ObjectId, userId: ObjectId) {
        const queryResult = await polls.findOne({
            _id: pollId,
            'scores.id': userId
        })
        console.log('is already voted')
        console.log(queryResult)
        if (queryResult) return true
        else return false
    }
    static async score(input: { pollId: ObjectId, userId: ObjectId, operator: Operator }) {
        return await polls.updateOne(
            { _id: input.pollId },
            { $push: { scores: { id: input.userId, operator: input.operator } } }
        )
    }
    static async removeScore(pollId: ObjectId, userId: ObjectId) {
        const queryResult = await polls.deleteOne({
            _id: pollId,
            'scores.id': userId
        })
        console.log('removeScore query result: ')
        console.log(queryResult)
        if (queryResult) return true
        else return false
    }
    static async getUserScoreDir(pollId: ObjectId, userId: ObjectId) {
        // TODO ببین میتونی به کل فرآیند جستجو داخل آرایه رو با استقاده از مونگو انجام بدی یا خیر
        const result = (await polls.findOne({
            _id: pollId,
        })) as unknown as Poll
        const score = result.scores.find(currentItem => currentItem.id.toString() === userId.toString())!
        
        return score ? score.operator : undefined
    }
}