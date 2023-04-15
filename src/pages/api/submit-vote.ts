
import type { NextApiRequest, NextApiResponse } from 'next'
import VoteManager from '@/Managers/vote'
import { getServerSession } from 'next-auth'
import authOption from './auth/[...nextauth]'
import UserManager from '@/Managers/user'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOption)
    if (!session)
        return res.status(401).end()
    const pollId = req.body.id
    // TODO read user id from session 
    const userId = (await UserManager.getUserData(session.user.email))!._id
    const alreadyVoted = await VoteManager.isAlreadyVoted(userId, new ObjectId(pollId))
    if (alreadyVoted)
        res.json({ result: 'already voted!' })
    else {
        VoteManager.vote({
            pollId: new ObjectId(pollId),
            selectedOption: req.body.index,
            userId
        })
        res.json({ result: 'vote saved' })
    }
}