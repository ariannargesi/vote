import { polls } from "@/server-logic/db/setup";
import { Poll } from "@/types";
import { ObjectId } from "mongodb";

export default class PollManager {
    static async createPoll(data: Poll) {
        return await polls.insertOne(data)        
    }
    static async deletePoll(_id: ObjectId){
        return await polls.deleteOne(
            {_id}
        )
    }
    static async alreadyVoted(pollId: ObjectId, userId: ObjectId) {
        const aggreationResult = polls.aggregate([
            {
              $match: { _id: pollId }
            },
            {
              $project: {
                vote: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$votes",
                        as: "vote",
                        cond: { $eq: ["$$vote.createdBy", userId] }
                      }
                    },
                    0
                  ]
                }
              }
            },
            {
              $project: {
                index: "$vote.index"
              }
            }
          ]);

        return (await aggreationResult.toArray()).at(0).index 
    }
}