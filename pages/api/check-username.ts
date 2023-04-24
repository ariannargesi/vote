import type { NextApiRequest, NextApiResponse } from 'next'
import { users } from "@/db/setup"
import { SafeRequestParams, safeRequest } from '@/utils/safeRequest'
import checkUsername from '@/utils'
export type CheckUsernameResponseType = {
    isValid: boolean
}

const rules: SafeRequestParams = {
    acceptedMethods: 'POST',
    body: {
        username: {
            type: 'string',
            minLength: 3,
            maxLength: 32
        },
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckUsernameResponseType>) {
    safeRequest(req, res, rules)
    const username = req.body.username
    res.json({ isValid: await checkUsername(username) })
}

