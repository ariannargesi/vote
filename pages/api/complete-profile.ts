import checkUsername from '@/utils'
import { SafeRequestParams, safeRequest } from '@/utils/safeRequest'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession, unstable_getServerSession } from 'next-auth'
import { Enriqueta } from 'next/font/google'
import authOption from './auth/[...nextauth]'
import { getToken } from 'next-auth/jwt'

const safeRequestOptions: SafeRequestParams = {
    acceptedMethods: 'POST',
    body: {
        location: {
            type: 'string',
        },
        username: {
            type: 'string',
            maxLength: 64,
            minLength: 3
        },
        bio: {
            type: 'string',
            maxLength: 512
        }
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    safeRequest(req, res, safeRequestOptions)
    const username = req.body.username 
    const isValid = await checkUsername(username)    
  
    // TODO 
    // find email address from session or cookie and add the fields 
    
}