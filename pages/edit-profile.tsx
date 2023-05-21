import Button from "@/features/Button"
import PickUsername from "@/features/profile/SelectValidUsername"
import axios from "axios"
import { FormEventHandler, ReactNode, useState } from "react"
import statics from '@/statics'
import { GetServerSidePropsContext } from "next/types"
import { Session, getServerSession } from "next-auth"
import authOption from "./api/auth/[...nextauth]"
import UserManager from "@/Managers/user"
import { getUserId } from "@/utils"
import Avatar from "@/features/Avatar"
import SelectAvatar from "@/features/profile/SelectAvatar"
import Header, { HeaderTitle } from "@/components/Header"
import ProfilePic from "@/components/ProfilePic"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // const session: Session | null = await getServerSession(context.req, context.res, authOption)
    // const userData = await UserManager.getUserData(session!.user?.email!)

    return {
        props: {
            // @ts-ignore
            // avatar: userData.avatar | null
        }
    }
}

export function Content(props: {
    children: ReactNode
}) {
    return (
        <div className="px-4">
            {props.children}
        </div>
    )
}
export function Select(props: { options: string[], name?: string }) {
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
export default function EditProfile() {
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

        } catch (error) {
            alert('یه مشکلی پیش اومده!')
        }
    }

    return (
        <>
            <Header
                start={<HeaderTitle>تکمیل پروفایل</HeaderTitle>}
            />
            <Content>
                
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-y-3">
                        <ProfilePic/>   
                        <SelectAvatar />
                    </div>
                    {/* <PickUsername
                        name='username'
                        onChange={isValid => setIsValid(isValid)}
                    /> */}
                    {/* <Select
                        options={statics.states}
                        name='state'
                    />
                    <Button>ثبت و ذخیره</Button> */}
                </form>
            </Content>
        </>
    )
}