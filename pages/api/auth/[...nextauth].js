import clientPromise from "@/server-logic/db/setup";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { log } from "console";
import NextAuth, { Session } from "next-auth";
import EmailProvider from "next-auth/providers/email";



const authOption = NextAuth({
    pages: {
        verifyRequest: '/verify'
    },
    session: { strategy: "jwt" },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
    ],
})

export default authOption

