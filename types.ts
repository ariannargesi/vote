import { ObjectId } from "mongodb"
import z from 'zod'

export type Vote = {
    createdBy: ObjectId,
    selectedIndex: number
}
export type Score = {
    id: ObjectId,
    operator: Operator
}

export type Poll = {
    title: string,
    caption: string,
    createdAt: Date,
    location: string,
    category: string,
    _id: ObjectId,
    ananymouse: boolean,
    creatorID: ObjectId,
    options: string[],
    scores: Score[],
    votes: Vote[],
    state?: string 
}


export enum Operator {
    Plus = 'UP',
    Minus = 'DOWN'
}

export enum ResponseType {
    ALREADY_EXIST = 409,
    DONE = 'DONE',
    SAVED = 200,
    FORBIDDEN = 403, 
    REMOVED = 'REMOVED',
    BAD_REQUEST = 400
}

export type User = {
    username: string,
    avatar?: string,
    location?: string,
    bio?: string,
}