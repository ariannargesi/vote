import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"

export const calcPercentage = (x: number, y: number): number => x*100/y 

export const getUser = async (req: NextApiRequest) => {
    const session = await getSession({req})
}