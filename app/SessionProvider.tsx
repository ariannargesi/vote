'use client'

import { SessionProvider } from "next-auth/react"
import { getServerSession } from "next-auth"



export default function Provider (props: any) {
    return (
        <SessionProvider session={props.session} >
            {props.children}
        </SessionProvider>
    )
}