import { users } from "@/server-logic/db/setup";
import { ObjectId } from "mongodb";
import { userAgentFromString } from "next/server";

export default class UserManager {
    static async getUserData(email: string){
        return await users.findOne({email})
    }
    static async updateProfile(userId: ObjectId, data: any){
       const result = await users.updateOne({_id: userId}, {$set: data})
       console.log(result)
    }
    static async getState(userId: ObjectId): Promise<string | null> {
        const result = 
            await users.findOne(
                {_id: userId},
                {projection: {state: 1}}
            ) 
        return result.state 
    }

}
