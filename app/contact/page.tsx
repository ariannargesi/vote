import { Page, Header, Content, Footer } from '../cmp/shared/layouts'
import React from 'react'

import Link from 'next/link'
import Form from './cmp/form'
import { readdirSync } from 'fs'
import client from '../db/setup'
import { getServerSession } from 'next-auth'
import authOption from '@/pages/api/auth/[...nextauth]'

export default async function Contact () {
    
    const session = await getServerSession(authOption)
    console.log('CONTACT SESSION: ', session)

    async function handleSubmit() {
        'use server'
        console.log('submitting')
        const result = await client.query('SELECT * FROM "contact-form"')
        console.log(result)
       
    }

    return (
        <Page>
            <Header title='ارتباط/درباره' />
            <Content extendClass='p-2'>
                <h1 className="text-xl font-bold text-center mt-8">شبکه اجتماعی رای‌گیری و نظرسنجی</h1>
                <div className='pt-32'>
                    <Form onSubmit={handleSubmit}/>
                </div>
            </Content>
            <Footer>
                <h1 className='text-center'>ساخته شده توسط <Link href='https://arianoo.ir' className='text-info font-bold'>آرین نرگسی</Link></h1>
            </Footer>
        </Page>
    )
}