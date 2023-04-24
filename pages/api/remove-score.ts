import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import authOption from './auth/[...nextauth]'
import UserManager from '@/Managers/user'
import { polls } from '@/db/setup'
import { ObjectId } from 'mongodb'
import ScoreManager from '@/Managers/score'
import { ResponseType } from '@/types'

// api/remove-score
export default async function handler( req: NextApiRequest, res: NextApiResponse) {
   // user id // pollid 
    const session = await getServerSession(req, res, authOption)
    if(!session)
        return res.status(401).end()
    // TODO rad userId from session
    const userId = (await UserManager.getUserData(session.user.email))?._id!
    const pollId = req.body.id 

    // remove score 
    ScoreManager.removeScore(new ObjectId(pollId), userId)
    res.json(ResponseType.DONE)
}