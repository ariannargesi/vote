import FullScreen from '@/components/full-screen'
import { Header, Content, Page } from '../pages/cmp'
import Image from 'next/image'
import { Input, Label, Textarea } from '@/components/form'
import SelectUsername from '@/components/profile/SelectValidUsername'
import Avatar from '@/components/Avatar'
import Button, { IconButton } from '@/components/Button'
import { PenFill } from 'react-bootstrap-icons'
import { ChangeEvent, useRef, MouseEvent, useState } from 'react'
import httpServer from '@/axios'
import { toast } from 'react-toastify'
import Spinner from '@/components/Spinner'
import { AppContext } from 'next/app'
import { Session, getServerSession, } from 'next-auth'
import authOption from './api/auth/[...nextauth]'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { users } from '@/server-logic/db/setup'
import { User } from '@/types'
import { getSession, useSession } from 'next-auth/react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { setSourceMapRange } from 'typescript'
import { ServerHeartbeatFailedEvent } from 'mongodb'
import axios from 'axios'

async function getUser(context: GetServerSidePropsContext): Promise<User> {
    const session: Session = (await getServerSession(context.req, context.res, authOption))!
    console.log('session')
    console.log(session)
    // const user = await users.findOne<User>({ email: session.user.email }) as User
    // return user
    return { username: 'ali', bio: 'fasdfds' }
}

interface Props {
    avatar?: string,
    username: string,
    bio?: string,
    location?: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { username, bio, avatar, location } = await getUser(context)

    return {
        props: {
            username,
            bio: bio || null,
            avatar: avatar || null,
            location: location || null
        }
    }
}

export default function Profile(props: Props) {
    const { data } = useSession()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [src, setSrc] = useState<string>()

    function fileInputHandler() {
        fileInputRef.current?.click()

    }

    async function uploadFileHandler(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files) {
            const file = files[0]
            setSrc(URL.createObjectURL(file))
        }
    }
    const session = useSession()

    return (
        <Page>
            {JSON.stringify(session)}
            <Header extraClasses='flex items-center justify-between'>
                <h1 className="text-xl font-bold">ویرایش پروفایل</h1>
                <FullScreen />
            </Header>
            <Content>
                <div className='flex flex-col items-center relative'>
                    {loading && <Spinner />}
                    <Avatar src={'https://picsum.photos/80'} />
                    <div className='-translate-y-4'>
                        <IconButton onClick={fileInputHandler}><PenFill /></IconButton>
                        <input type="file" accept='.jpg, .jpeg' hidden ref={fileInputRef} onChange={uploadFileHandler} />
                    </div>
                </div>
                <SelectUsername name='username' onChange={value => { }} />
                <Label>بایو</Label>
                <Textarea />
            </Content>
        </Page>
    )
}
