import cn from 'classnames'
import React, { ReactNode } from 'react'
import Image from 'next/image'
import { Plus, Dash, Fingerprint, ChatRightText  } from 'react-bootstrap-icons'
import Badge from './shared/badge'

export default function Card () {
    return (
        <div className="bg-secondary p-3 flex gap-x-3">
            <div>
                <Image src={'https://xsgames.co/randomusers/avatar.php?g=pixel'} alt='user profile' width={42} height={42} className='rounded-full'/>
            </div>
            <div>
                <div className='flex gap-x-2 items-center'>
                    <span className='text-sm'>alireza.jalili</span>
                    <span className='text-gray-400 text-xs'>دیروز</span>
                </div>
                <h1 className='font-bold'>میخوام یه گوشی تا ۸ تومن بگیرم. به نظرتون کدومش؟</h1>
                <div className='flex gap-x-3 mt-1'>
                    <Badge extraClassName='flex items-center gap-x-2'>
                            <Plus />
                            <span>۵۴</span>
                            <Dash />
                    </Badge>
                    <Badge extraClassName='flex items-center gap-x-2'>
                        <span>۱۲۰۰</span>
                        <Fingerprint />
                    </Badge>
                    <Badge extraClassName='flex items-center gap-x-2'>
                        <span>۱۲</span>
                        <ChatRightText />
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export function Skeleton () {
    return (
        <div className="bg-secondary p-3 flex gap-x-3 animate-pulse">
            <div>
                <div className='bg-slate-500 w-10 h-10 rounded-full'></div>
            </div>
            <div className='w-full space-y-2'>
                <div className='flex gap-x-2 items-center'>
                    <span className='w-14 h-4 bg-slate-500 rounded-lg'/>
                    <span className='w-10 h-4 bg-slate-500 rounded-lg'/>
                </div>
                 <div className='h-6 bg-slate-500 rounded-lg'/>
                <div className='flex gap-x-3 mt-1'>
                    <div className='w-14 h-4 bg-slate-500 rounded-lg'/>
                    <div className='w-14 h-4 bg-slate-500 rounded-lg'/>
                    <div className='w-14 h-4 bg-slate-500 rounded-lg'/>
                </div>
            </div>
        </div>
    )
}

