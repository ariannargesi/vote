'use client'

import { useState } from "react"
import ConfirmBox, { useConfirmBoxStore } from "./shared/confirm-box"
import { Header, Footer, Page, Content } from "./shared/layouts"
import Button from "@/components/Button"

export default function Playground () {
    
    const askformConfirm = useConfirmBoxStore(state => state.askForConfirm)

    function confirmCallback () {
        alert('confirmCallback')
    }

    function onClickHandler () {

        askformConfirm(
            'مطمعنی میخوای اینو حذف کنیبلسبی؟', 
            'آره. حذفش کن',
            confirmCallback
        )
    }

    return (
        <Page>
            <Header title="کامپوننت‌ها" end={<Button className="relative z-10" onClick={onClickHandler}>T</Button>}/>
            <Content>
                <h1 className="text-4xl">سلام  به تو ای دوست من</h1>
          
                <h1 className="text-4xl">سلام  به تو ای دوست من</h1>
                <h1 className="text-4xl">سلام  به تو ای دوست من</h1>
                <h1 className="text-4xl">سلام  به تو ای دوست من</h1>
                <ConfirmBox/>
            </Content>
        </Page>
    )
}