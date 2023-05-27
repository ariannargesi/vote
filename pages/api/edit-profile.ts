import type { NextApiRequest, NextApiResponse } from 'next'
import z from 'zod'
import statics from '@/server-logic/statics'
import axios from 'axios'
import { error } from 'console'
import checkUsername, { getUserId } from '@/server-logic/utils'
import UserManager from '@/server-logic/Managers/user'
import { getServerSession } from 'next-auth'
import authOption from './auth/[...nextauth]'

const Schema = z.object({
    username: z.string().min(3).max(64).refine(async value => {
       const isValid = await checkUsername(value)
       return isValid 
    }),
    state: z.string().refine(value => {
        return statics.states.includes(value)
    }).optional()
})

type Schema = z.infer<typeof Schema>

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReponseType>) {
    const userId = await getUserId(req, res)
    console.log(userId)
    const requestBody = req.body as Schema

    const obj:{username: string, state?: string} = {username: requestBody.username }
    if(requestBody.state)
        obj.state = requestBody.state 
    try {
        Schema.parseAsync(requestBody)
        UserManager.updateProfile(userId, obj)
    }catch(err){
        
    }
}