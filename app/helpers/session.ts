import authOption from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export async function getSession(){
    const session = (await getServerSession(authOption))!
    // @ts-ignore
    return session.user.email 
}