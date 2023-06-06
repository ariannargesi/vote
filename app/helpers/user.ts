import authOption from "@/pages/api/auth/[...nextauth]"
import { users } from "@/server-logic/db/setup"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"

interface User {
    email: string,
    username: string,   
    _id: ObjectId,
    avatar?: string,
    bio?: string,
    location?: string,
}

export async function getUser (): Promise<User> {
    const session = await getServerSession(authOption)
    // @ts-ignore
    const email = session.user.email 
    const user = (await users.findOne<User>({email}))
    return user as User  
}