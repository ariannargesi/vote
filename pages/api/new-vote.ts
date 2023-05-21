import { polls as pollsCollection } from '@/server-logic/db/setup'
import { InsertOneResult } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import authOption from './auth/[...nextauth]'
import UserManager from '@/server-logic/Managers/user'
import { toShamsiDate } from '@/server-logic/utils'




export default async function handler(req: NextApiRequest, res: NextApiResponse<InsertOneResult>) {

    const session = await getServerSession(req, res, authOption)
    if(!session) return res.status(401).end()
    
    // TODO read user id from session 
    
    const poll = {
        ...req.body,
        scores: [],
        votes: [],
        createdAt: toShamsiDate(new Date()),
    }
    const result: InsertOneResult = await pollsCollection.insertOne(poll)
    res.json(result)
}