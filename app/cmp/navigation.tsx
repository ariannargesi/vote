import React from 'react'
import Button from '@/components/Button'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import Link from 'next/link'
import { PlusSquareFill, House, PersonFill, HouseFill } from 'react-bootstrap-icons'
import FontAwesome from 'react-fontawesome'

export default function Footer() {
    const isLoggedIn = useIsLoggedIn()
    return (
        <div className='p-2 px-6 h-12'>
            {isLoggedIn ?
                <div className='text-3xl flex justify-between w-full text-gray-500'>
                    <Link href={'/profile'} className='text-white'>
                        <PersonFill />
                    </Link>
                    <Link href={'/new-vote'}>
                        <PlusSquareFill />
                    </Link>
                    <Link href={'/'} >
                        <HouseFill />
                    </Link>
                </div>
                :
                <Link href={'/api/auth/signin'} className='w-full'>
                    <Button full>ورود</Button>
                </Link>
            }
        </div>
    )
}