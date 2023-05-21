
import type { NextApiRequest, NextApiResponse } from 'next'
import VoteManager from '@/server-logic/Managers/vote'
import { getServerSession, Session } from 'next-auth'
import authOption from './auth/[...nextauth]'
import UserManager from '@/server-logic/Managers/user'
import { ObjectId } from 'mongodb'
import { STATUS_CODES } from 'http'
import { ResponseType } from '@/types'
import { log } from 'console'
import { polls } from '@/server-logic/db/setup'

// TODO learn more about aggregations in next.js
const getPollResult = async (pollId: ObjectId)  => {
    const aggregationResult = polls.aggregate([
        {
          $match: {
            _id: pollId
          }
        },
        {
          $project: {
            votes: 1,
            total: {
              $size: "$votes"
            }
          }
        },
        {
          $unwind: "$votes"
        },
        {
          $group: {
            _id: "$votes.index",
            count: {
              $sum: 1
            },
            total: {
              $first: "$total"
            }
          }
        },
        {
          $project: {
            _id: 0,
            index: "$_id",
            value: {
              $multiply: [
                {
                  $divide: [
                    "$count",
                    "$total"
                  ]
                },
                100
              ]
            }
          }
        },
        {
          $project: {
            index: 1,
            value: {
              $round: [
                "$value",
                2
              ]
            }
          }
        }
      ])
    return aggregationResult.toArray()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session: Session | null = await getServerSession(req, res, authOption)
    if (!session)
    return res.status(401).end()
    const email = session.user?.email!
    const userId = (await UserManager.getUserData(email))!._id
    const pollId = new ObjectId(req.body.pollId)
    const pollState = await VoteManager.getState(pollId)
    const userState = await UserManager.getState(userId)

    if(pollState != userState)
      return res.status(ResponseType.FORBIDDEN)
    
    // TODO read user id from session 
    const alreadyVoted = await VoteManager.isAlreadyVoted(userId, pollId)
    if (alreadyVoted)
        res.status(ResponseType.ALREADY_EXIST).end()

    else {
        VoteManager.vote({
            pollId: pollId,
            selectedOption: req.body.index,
            userId
        })
        const pollResults = await getPollResult(pollId)
        res.status(ResponseType.SAVED).json(pollResults)
    }
}