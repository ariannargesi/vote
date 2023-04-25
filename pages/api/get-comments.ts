import CommentManager from '@/Managers/comment'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type Comment = {
    date: Date,
    author: string,
    comment: string,
    canDelete: boolean
}

export type ReponseType = {
    hasMore: boolean,
    commentsList: Comment[]
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<ReponseType>) {
    const { page, pollId } = req.query
    console.log(req.query)
    const comments = await CommentManager.getCommentsWithOffset(Number(page), new ObjectId(pollId as string)) as Comment[]
    res.status(200).json({
        hasMore: true,
        commentsList: comments
    })
}