import { polls } from "@/db/setup";
import { Poll } from "@/types";
import { log } from "console";
import { ObjectId } from "mongodb";

enum Operator {
    Plus,
    Minus
}

export default class VoteManager {
    static async vote(input: { pollId: ObjectId, userId: ObjectId, selectedOption: number }) {
        const result = await polls.updateOne(
            { _id: input.pollId },
            { $push: { votes: { createdBy: input.userId, index: input.selectedOption } } }
        )
        return result
    }
    static async isAlreadyVoted(userId: ObjectId, pollId: ObjectId) {
        const queryResult = await polls.findOne({
            _id: pollId,
            'votes.createdBy': userId
        })
        if (queryResult) return true
        else return false
    }
    static async getPollResult(pollId: ObjectId) {
        const aggregationResult = polls.aggregate([
            {
                $match: {
                    _id: pollId
                }
            },
            {
                $project: {
                    votes: 1,
                    total: {
                        $size: "$votes"
                    }
                }
            },
            {
                $unwind: "$votes"
            },
            {
                $group: {
                    _id: "$votes.index",
                    count: {
                        $sum: 1
                    },
                    total: {
                        $first: "$total"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    index: "$_id",
                    value: {
                        $multiply: [
                            {
                                $divide: [
                                    "$count",
                                    "$total"
                                ]
                            },
                            100
                        ]
                    }
                }
            },
            {
                $project: {
                    index: 1,
                    value: {
                        $round: [
                            "$value",
                            2
                        ]
                    }
                }
            }
        ])
        return aggregationResult.toArray()
    }
    static async getVotesCount(pollId: ObjectId): Promise<number> {
        const aggregationResult = polls.aggregate([
            {
                $match: { _id: pollId }
            },
            {
                $project: {
                    _id: 0,
                    count: {
                        $size: "$votes"
                    }
                }
            }
        ])
        return (await aggregationResult.toArray()).at(0).count as number 
    }
}

