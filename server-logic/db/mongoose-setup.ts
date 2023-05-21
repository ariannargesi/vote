import { User as NextAuthUser } from "next-auth";
import { Schema } from "mongoose";

interface User extends NextAuthUser {
    username: string | undefined,
    avatar: string | undefined,
    state: string | undefined  
}

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const UserSchema = new Schema<User>({})

export const Cat = mongoose.model('Cat', { name: String });
export const User = mongoose.model('Cat', { 
    username: String || undefined 
 });

