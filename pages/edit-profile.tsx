import Button from "@/features/Button"
import PickUsername from "@/features/profile/SelectValidUsername"
import axios from "axios"
import { FormEventHandler, useState } from "react"
import statics from '@/statics'
import { GetServerSidePropsContext } from "next/types"
import { getServerSession } from "next-auth"
import authOption from "./api/auth/[...nextauth]"

export async function getServerSideProps (context: GetServerSidePropsContext) {
   
    return {
        props: {

        }
    }
}

export function Content (props) {
    return (
        <div className="px-4">
            {props.children}
        </div>
    )
}
export function Select (props: {options: string[], name?:string}) {
    return (
        <select name={props.name}>
            <option value="کلیشب">شسبیس</option>
            {props.options.map(currentItem => (
                <option value={currentItem} key={currentItem}>
                    {currentItem}        
                </option>
            ))
            }
        </select>
    )
}
export default function EditProfile () {
    const [isValid, setIsValid] = useState(false)

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const endpoint = "/api/edit-profile"
        const body = {
            username: formData.get('username'),
            state: formData.get('state')
        }
        try {
            const response = await axios.post(endpoint, body)
        
        }catch(error){
            alert('یه مشکلی پیش اومده!')
        }
    }

    return (
        <Content>
            <h1 className="text-2xl font-bold">تکمیل پروفایل</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <PickUsername
                    name='username'
                    onChange={isValid => setIsValid(isValid)}
                />
                <Select
                    options={statics.states}
                    name='state'
                />
                <Button>ثبت و ذخیره</Button>
            </form>
        </Content>
    )
}