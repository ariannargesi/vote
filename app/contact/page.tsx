import { Page, Header, Content, Footer } from '../cmp/shared/layouts'
import React from 'react'
import { Label, Textarea } from '../cmp/shared/input'
import Button from '../../components/Button'
import Link from 'next/link'

export default function Contact (props) {
    return (
        <Page>
            <Header title='ارتباط/درباره' />
            <Content extendClass='p-2'>
                <h1 className="text-xl font-bold text-center mt-8">شبکه اجتماعی رای‌گیری و نظرسنجی</h1>
                <div className='pt-32'>
                <Label htmlFor='message'>ارسال پیام</Label>
                <Textarea id='message'/>
                <Button full extendClass='mt-4' color='info'>ارسال</Button>
                </div>
            </Content>
            <Footer>
                <h1 className='text-center'>ساخته شده توسط <Link href='https://arianoo.ir' className='text-info font-bold'>آرین نرگسی</Link></h1>
            </Footer>
        </Page>
    )
}