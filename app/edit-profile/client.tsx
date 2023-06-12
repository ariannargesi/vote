'use client'

import { ChangeEvent, useRef, useState } from "react"
import { Header, Page, Content } from "@/pages/cmp"
import FullScreen from "@/components/full-screen"
import Avatar from "@/components/Avatar"
import Spinner from '@/components/Spinner'
import Button, { IconButton } from "@/components/Button"
import SelectUsername from "@/components/profile/select-username"
import { Label, Textarea } from "@/components/form"
import { PenFill, X } from "react-bootstrap-icons"
import { className as inputClassName } from "@/components/form"
import { locations } from "../../shared"
import httpServer from "@/axios"
import { toast } from "react-toastify"
import ImageCropper from "./image-cropper"

export default function ProfilePage(props: { location?: string, bio?: string, username: string, avatar?: string | null }) {

    const [isLoading, setLoading] = useState(false)
    const [username, setUsername] = useState(props.username)
    const [bio, setBio] = useState(props.bio)
    const [location, setLocation] = useState(props.location)
    // related to profile picture 
    const [pictureSrc, setPictureSrc] = useState<string | null | undefined>(props.avatar )
    const [cropperPic, setCropperPic] = useState<string | null>(null)
    const fileType = useRef<string | null>(null)
    
    const [isValidUsername, setIsValidUsername] = useState(true)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function fileInputHandler() {
        fileInputRef.current?.click()
    }

    async function sumibtHandler() {
        const body: any = {}
        if(username != props.username )
            body.username = username 
        if(bio != props.bio)
            body.bio = bio 
        if(location != props.location)
            body.location = location 
        if(pictureSrc === undefined)
            body.avatar = 'clear'
        
        else if(pictureSrc != props.avatar){
            const type = fileType.current!.split('/')[1]
            const blob = await fetch(pictureSrc!).then(r => r.blob())
            const file = new File([blob], 'avatar.'+ type)
            body.avatar = file 
        }
    
        setLoading(true)
        try {
            const { data } = await httpServer.patch('/edit-profile', body, { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
             })
            if(data.type === 'success'){
                toast.success(data.message)
                props.bio = bio 
                props.location = location
                props.username = username
                props.avatar = pictureSrc
            }
            else toast.warning(data.message)
        }
        catch (error) {
            toast.error('مشکلی پیش آمده!')
        } finally {
            setLoading(false)
        }
    }

    async function uploadFileHandler (event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if(!files)
        return 
        const file = files[0]
        fileType.current = file.type  
        const image = new Image()
        const objectURL = URL.createObjectURL(file)
        image.src = objectURL

        async function onLoad () {
            setCropperPic(objectURL)        
            URL.revokeObjectURL(objectURL)
        }
        image.onload = onLoad
    }

    function handleClearAvatar () {
        setPictureSrc(undefined)
    }

    return (
        <Page>
            <Header extraClasses='flex items-center justify-between'>
                <h1 className="text-xl font-bold">ویرایش پروفایل</h1>
                <FullScreen/>
            </Header>
            <Content>
                <div className='flex flex-col items-center relative'>
                    {pictureSrc && <div onClick={handleClearAvatar} className="bg-white absolute rounded-full bg-gray-200 border border-black translate-x-10 -translate-y-3"><X fontSize={22}/></div> }
                    <Avatar src={pictureSrc || undefined} />
                    <div className='-translate-y-4'>
                        <IconButton onClick={fileInputHandler}><PenFill /></IconButton>
                        <input type="file"  hidden ref={fileInputRef} onChange={uploadFileHandler} />
                    </div>
                </div>
                <SelectUsername value={username} onChange={(isValid, value) => {
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
                    onClick={isLoading ? undefined : sumibtHandler }
                    disabled={bio === props.bio && props.avatar === pictureSrc &&  location === props.location && (username == props.username || !isValidUsername)}
                    color="success"
                    full
                    extendClass="mt-5"
                >
                    {isLoading ? <Spinner/> : 'ذخیره'}
                </Button>
            {cropperPic && 
                <ImageCropper 
                    src={cropperPic} 
                    selectHandler={(dataURL) => { setPictureSrc(dataURL); setCropperPic(null);}}
                    closeHandler={() => setCropperPic(null)}
                /> 
            }
            </Content>
        </Page>
    )
}