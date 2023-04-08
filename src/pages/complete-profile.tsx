import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"
import Button from "@/component/Button"
import { Label, Textarea, className } from "@/component/form"
import SelectUsername from "@/component/profile/SelectValidUsername"


export default function CompleteProfile() {

    const [valid, setValid] = useState(false)

    const { data: session, status } = useSession()

    // useEffect(() => {
    //     if(status === 'unauthenticated')
    //         Router.push(paths.signin)
    // }, [status])


    return (
        <div className="flex items-center h-full justify-center ">
            <form className="w-3/4" onSubmit={event => {
                event.preventDefault()
                const formData = new FormData(event.target as HTMLFormElement)
            }}>
                <h1 className="text-3xl font-bold">ثبت نام</h1>
                <SelectUsername
                    name="username"
                    onChange={data => setValid(data) }
                />
                <Label>در مورد خودت بگو <span className="text-sm">(اختیاری)</span></Label>
                <Textarea name="bio" />
                <Label>استان <span className="text-sm">(اختیاری)</span></Label>
                <select className={className} name="location">
                    <option value="empty">مهم نیست</option>
                    <option value="rasht">رشت</option>
                    <option value="tehran">تهران</option>
                </select>
                <Button extendClass='mt-2' full type="submit" disabled={!valid}>ثبت نام</Button>
            </form>
        </div>
    )
}