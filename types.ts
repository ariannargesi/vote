import { ObjectId } from "mongodb"


export type Vote = {
    createdBy: ObjectId, 
    selectedIndex: numer 
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
    votes: Vote[]
}


export enum Operator {
    Plus = 'UP',
    Minus = 'DOWN' 
}

export enum ResponseType {
    ALREADY_EXIST = 409,
    DONE = 'DONE',
    SAVED = 200,
    REMOVED = 'REMOVED'
}