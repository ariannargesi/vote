import { polls as pollsCollection } from '@/db/setup'
import { InsertOneResult } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse<InsertOneResult>) {
    req.body.options = req.body.options.map(currentItem => {
        return {
            title: currentItem,
            voters: []
        }
    })
    const result: InsertOneResult = await pollsCollection.insertOne(req.body)
    res.json(result)
}