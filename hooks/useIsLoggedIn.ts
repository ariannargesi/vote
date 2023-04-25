import { useSession } from "next-auth/react"

export default function useIsLoggedIn () {
    const { data: session, status } = useSession()
        if(status === 'unauthenticated')
            return false 
        else return true 
}