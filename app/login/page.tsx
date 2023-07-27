
'use client'
import React, { useEffect, useState } from "react";
import { className as inputClassName, Input } from "@/components/form"
import { Content, Header, Page } from "@/pages/cmp";

import Button from "@/components/Button";
import { getCsrfToken, signIn } from "next-auth/react";
import Form from "./components/InputWithSubmit";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import InputWithSubmit from "./components/InputWithSubmit";

export default function Login () {    

    const [input, setInput] = useState('')

    const baseURL = '/api/auth/signin/email'
    let actionUrl = '/api/auth/signin/email'


    function submit () {
        if(input){
            // signIn('email', {callbackUrl: '/hello'})
        }
    }

    return (
        
        <Page>
            <Header title="ورود"/>
            <Content>
                <div className="h-full flex flex-col justify-center gap-3">
                    <label htmlFor="email">آدرس ایمیلت رو وارد کن</label>
                    <InputWithSubmit/>
                </div>
            </Content>
        </Page>
    )
}