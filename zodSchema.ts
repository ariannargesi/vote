import z from 'zod'
import { ObjectId } from 'mongodb'

export const objectIdSchema = 
    z.string().refine(val => ObjectId.isValid(val))