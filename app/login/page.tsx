
'use client'
import React, { useEffect, useState } from "react";
import { className as inputClassName, Input } from "@/components/form"
import { Content, Header, Page } from "@/pages/cmp";
import Button from "@/components/Button";
import { getCsrfToken, signIn } from "next-auth/react";
import Form from "./components/form";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

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
            <Header>
                <h1 className="text-xl font-bold">ورود</h1>
            </Header>
            <Content>
                <div className="h-full flex flex-col justify-center">
                    <h1></h1>
                    <h1 className="text-2xl font-bold">آدرس ایمیلت رو وارد کن</h1>
                    <input type="text" value={input} onChange={event => setInput(event.target.value)} />
                    <button onClick={submit}>Submit</button>
                </div>
            </Content>
        </Page>
    )
}