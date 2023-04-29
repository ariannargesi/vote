import Button from "@/features/Button"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Profile() {
    const { data } = useSession()
    return (
        <div>
            {JSON.stringify(data)}
            <br />
            {data ?
                <Button color="danger" onClick={() => signOut()}>
                    خروج
                </Button>
                :
                <Button color={'success'} onClick={() => signIn()}>ورود</Button>

            }
           
        </div>
    )
}