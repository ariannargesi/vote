import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import authOption from './auth/[...nextauth]'
import { safeRequest } from '@/server-logic/utils/safeRequest'
import ScoreManager from '@/server-logic/Managers/score'
import { users } from '@/server-logic/db/setup'
import UserManager from '@/server-logic/Managers/user'
import { ObjectId } from 'mongodb'
import { ResponseType } from '@/types'

export default async function handler( req: NextApiRequest, res: NextApiResponse<ResponseType>) {
 console.log('score manager is running')
 const session = await getServerSession(req, res, authOption)

 if(!session)   
    return res.status(401).end()

 const { id, operator } = req.body 
 const userId = (await UserManager.getUserData(session.user.email))?._id!
 const isAlreadyScored = await ScoreManager.isAlreadyScored(new ObjectId(id), userId)

 if(isAlreadyScored){
    res.json(ResponseType.ALREADY_EXIST)
 }
 else {
    const result = await ScoreManager.score({
        pollId: new ObjectId(id), 
        userId,
        operator 
    })
    console.log(result)
    res.json(ResponseType.DONE)
 }
}