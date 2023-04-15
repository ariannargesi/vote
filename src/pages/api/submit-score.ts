import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import authOption from './auth/[...nextauth]'
import { safeRequest } from '@/utils/safeRequest'
import ScoreManager from '@/Managers/score'
import { users } from '@/db/setup'
import UserManager from '@/Managers/user'
import { ObjectId } from 'mongodb'

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
 const session = await getServerSession(req, res, authOption)
 console.log(session)
 if(!session)   
    return res.status(401).end()

 const { id, operator } = req.body 
 const userId = (await UserManager.getUserData(session.user.email))?._id!
 const isAlreadyScored = await ScoreManager.isAlreadyScored(new ObjectId(id), userId)

 if(isAlreadyScored){
    res.json({data: 'already scored'})
 }
 else {
    const result = await ScoreManager.score({
        pollId: new ObjectId(id), 
        userId,
        operator 
    })
    console.log(result)
    res.json({data: 'score saved'})
 }
}