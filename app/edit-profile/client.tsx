'use client'

import { ChangeEvent, useRef, useState } from "react"
import { Header, Page, Content } from "@/pages/cmp"
import FullScreen from "@/components/full-screen"
import Avatar from "@/components/Avatar"
import Spinner from '@/components/Spinner'
import Button, { IconButton } from "@/components/Button"
import SelectUsername from "@/components/profile/SelectValidUsername"
import { Label, Textarea } from "@/components/form"
import { PenFill } from "react-bootstrap-icons"
import { className as inputClassName } from "@/components/form"
import { locations } from "../../shared"
import httpServer from "@/axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { unescape } from "querystring"

export default function ProfilePage(props: { location?: string, bio?: string, username: string }) {

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(props.username)
    const [bio, setBio] = useState(props.bio)
    const [location, setLocation] = useState(props.location)
    const [isValidUsername, setIsValidUsername] = useState(true)
    const fileInputRef = useRef<HTMLInputElement>(null)
    function fileInputHandler() {
        fileInputRef.current?.click()
    }

    const [data, setData] = useState(null)

    async function clickHandler() {
        setLoading(true)

        try {
            const { data } = await httpServer.patch('/user', { location, username, bio })
            setData(data)
        }
        catch (error) {
            toast.error('مشکلی پیش آمده!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Page>
            <Header extraClasses='flex items-center justify-between'>
                <h1 className="text-xl font-bold">ویرایش پروفایل</h1>
                <FullScreen />
            </Header>
            <Content>
                {JSON.stringify(data)}
                <div className='flex flex-col items-center relative'>
                    {loading && <Spinner />}
                    <Avatar src={'https://picsum.photos/80'} />
                    <div className='-translate-y-4'>
                        <IconButton onClick={fileInputHandler}><PenFill /></IconButton>
                        {/* <input type="file" accept='.jpg, .jpeg' hidden ref={fileInputRef} onChange={uploadFileHandler} /> */}
                    </div>
                </div>
                <SelectUsername value={username} defaultValue={props.username} onChange={(isValid, value) => {
                    setIsValidUsername(isValid)
                    setUsername(value)
                }} />
                <Label>بایو</Label>
                <Textarea value={bio} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setBio(event.target.value)} maxLength={2048} name="bio" />
                <Label>محل سکونت</Label>
                {props.location ?
                    <span>{location}</span>
                    :
                    <>
                        <select className={inputClassName} onChange={(event: ChangeEvent<HTMLSelectElement>) => setLocation(event.target.value) }>
                            {locations.map(currentItem => (
                                <option key={currentItem}>
                                    {currentItem}
                                </option>
                            ))
                            }
                        </select>
                        <span className="text-red-400">تا اطلاع ثانوی امکان ویرایش محل سکونت وجود ندارد!</span>
                    </>
                }

                <Button
                    onClick={clickHandler}
                    disabled={bio === props.bio &&  location === props.location && (username == props.username || !isValidUsername)}
                    color="success"
                    full
                    extendClass="mt-5"
                >ذخیره</Button>
            </Content>
        </Page>
    )
}