import { NextApiRequest, NextApiResponse } from "next"

export type SafeRequestParams = {
    acceptedMethods: string | string[]
    body?: any
}

export function safeRequest(req: NextApiRequest, res: NextApiResponse, options: SafeRequestParams) {

    const acceptedMethods = options.acceptedMethods

    // check request type 
    if (typeof acceptedMethods == 'string')
        if (req.method !== acceptedMethods)
            res.send(`invalid request type. expected ${acceptedMethods}, but got ${req.method}`) //invalid request type  
        else if (Array.isArray(acceptedMethods))
            if (acceptedMethods.indexOf(req.method) === -1)
                res.send('invalid request type') // invalid request type 

    // check the body of request

    const expectedKeys = Object.keys(options.body)
    const givenKeys = Object.keys(req.body)

    // check if all keys are matched 
    let missedKeys: string[] = []
    expectedKeys.forEach(key => {
        if (givenKeys.indexOf(key) === -1)
            missedKeys.push(key)
    })
    if (missedKeys.length > 0)
        res.send(`missed keys error. expected ${expectedKeys}, but got ${givenKeys}`) // send list of missed keys 

    // check types, length 
    const errors: string[] = []
    givenKeys.forEach(key => {
        const value = req.body[key]
        const rules = options.body[key]
        if (typeof value != rules.type)
            errors.push(`Types are not match. expected ${rules.type}, But got ${typeof value} for ${key}`)
        if (value.length < rules.minLength)
            errors.push(`minLength error. expected ${rules.minLength}, But got ${value.length} for ${key}`)
        else if (value.length > rules.maxLength)
            errors.push(`maxLength error. expected ${rules.maxLength}, But got ${value.length} for ${key}`)

    })

    if (errors.length > 0)
        res.send(errors)
}