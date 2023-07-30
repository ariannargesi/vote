'use client'
import React, { ReactNode } from 'react'

export default function VerifyMessage () {

    const poll = localStorage.getItem('poll')
    let message: ReactNode
    console.log(poll)
    if(poll)
        message = <p>لینک تایید به ایمیلت ارسال شد. لطفا لینک رو <span className="font-bold">کپی</span> و در <span className="font-bold">همین مرورگر</span> وارد کن تا نظرسنجیت ایجاد بشه.</p>
    else 
        message = <p>لینک تایید به ایمیلت ارسال شد. لطفا لینک رو <span className="font-bold">کپی</span> و در <span className="font-bold">همین مرورگر</span> وارد کن تا ایمیلت تایید بشه.</p>

    return message 
}