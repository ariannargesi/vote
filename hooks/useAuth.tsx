import paths from "@/paths"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Router from 'next/router'

export function useAuth () {
    const { data: session, status } = useSession()
    
    useEffect(() => {
        if(status === 'unauthenticated'){
            Router.push(paths.signin)
            console.log('This is running')
            console.log(status)
        }
    }, [status])
}