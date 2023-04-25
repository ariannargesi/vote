import CommentManager from '@/Managers/comment'
import UserManager from '@/Managers/user'
import { ResponseType } from '@/types'
import { objectIdSchema } from '@/zodSchema'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session, getServerSession } from 'next-auth'
import z from 'zod'
import authOption from './auth/[...nextauth]'
import { ObjectId } from 'mongodb'

const Schema = z.object({
    comment: z.string().min(3).max(1024),
    pollId: objectIdSchema
})

type Schema = z.infer<typeof Schema>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const requestBody = req.body as Schema
    try {
        Schema.parse(requestBody)

        const session: Session | null = await getServerSession(req, res, authOption)
        if (!session)
            return res.status(401).end()
        const email = session.user?.email!
        const userId = (await UserManager.getUserData(email))!._id
        const ress = await CommentManager.new({
            pollId: new ObjectId(requestBody.pollId),
            comment: requestBody.comment,
            createdBy: userId
        })
        console.log(ress)
        res.status(ResponseType.SAVED).end()
    } catch (error) {
        console.log(error)
        res.status(ResponseType.BAD_REQUEST).end()
    }
}