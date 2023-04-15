import { ObjectId } from "mongodb"

export type Option = {
    title: string,
    voters: ObjectId[]
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
    options: Option[] ,
}

export enum Operator {
    Plus,
    Minus 
}