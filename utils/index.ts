import { users } from "@/db/setup"

export default async function checkUsername(username: string): Promise<boolean> {   
    const isValid = await users.findOne({ username }) ? false : true
    return isValid
}