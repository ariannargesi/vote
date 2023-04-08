import type { NextApiRequest, NextApiResponse } from 'next'
import { users } from "@/db/setup"
import { SafeRequestParams, safeRequest } from '@/utils/safeRequest'

export type CheckUsernameResponseType = {
    isValid: boolean
}

const rules: SafeRequestParams = {
    acceptedMethods: 'POST',
    body: {
        username: {
            type: 'string',
            minLength: 16,
            maxLength: 32
        },
        parent: {
            type: 'string',
            minLength: 4,
            maxLength:44
        }
    }

}

export default async function checkUsername(req: NextApiRequest, res: NextApiResponse<CheckUsernameResponseType>) {
    safeRequest(req, res, rules)
    const username = req.body.username
    const isValid = await users.findOne({ username }) ? false : true
    res.json({ isValid })
}

