import { polls as pollsCollection } from '@/db/setup'
import { InsertOneResult } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import authOption from './auth/[...nextauth]'
import UserManager from '@/Managers/user'
import { toShamsiDate } from '@/utils'




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