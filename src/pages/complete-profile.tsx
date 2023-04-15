import { useSession } from "next-auth/react"
import { FormEvent, useEffect, useState } from "react"
import axios from "axios"
import Button from "@/component/Button"
import { Label, Textarea, className } from "@/component/form"
import SelectUsername from "@/component/profile/SelectValidUsername"
import Router from "next/router"
import paths from "@/paths"
import { useAuth } from "@/hooks/useAuth"


export default function CompleteProfile() {
    
    useAuth()
    
    const [valid, setValid] = useState(false)   
    async function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const values = {
            username: formData.get('username'),
            location: formData.get('location'),
            bio: formData.get('bio')
        }        
        const result = await axios.post('/api/complete-profile', values)
        console.log(result)
    }




    return (
        <div className="flex items-center h-full justify-center ">
            <form className="w-3/4" onSubmit={handleSubmit}>
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
                <Button extendClass='mt-2' full type="submit" disabled={!valid} >ثبت نام</Button>
            </form>
        </div>
    )
}