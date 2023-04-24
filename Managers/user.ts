import { users } from "@/db/setup";

export default class UserManager {
    static async getUserData(email: string){
        return await users.findOne({email})
    }
}
