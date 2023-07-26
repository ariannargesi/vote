'use client'
import Button from "@/components/Button"
import { Input } from "@/components/form"
import { getCsrfToken } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Form(props: {actionUrl: string}) {
    const [csrfToken, setCsrfToken] = useState<string>()
     
    useEffect(() => {
        getCsrfToken()
            .then(token => {
                setCsrfToken(token)
            })
    }, [])

    if(!csrfToken)
        return <>'صبور باش!'</>

    return (
        <form method="POST" action={props.actionUrl}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Input name="email" value={'ariannargesi@gmail.com'} placeholder="example@gmail.com" required type="email" />
            <Button color="primary" full extendClass="mt-2">ثبت</Button>
        </form>
    )
}