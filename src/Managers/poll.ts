import { polls } from "@/db/setup";
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
}