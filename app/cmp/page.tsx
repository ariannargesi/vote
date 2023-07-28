'use client'

import React, { useState } from "react"
import Modal, { useModalStore } from "./shared/modal"
import { Header, Footer, Page, Content } from "./shared/layouts"
import Button from "@/components/Button"
import LocationsList from './locations-list'

export default function Playground () {
    
    const [input, setInput] = useState('')

    const toggleModal = useModalStore(state => state.toggleModal)

    function confirmCallback () {
        alert('confirmCallback')
    }

    function onClickHandler () {

        toggleModal()
    }

    return (
        <Page>
            <Header title="کامپوننت‌ها" end={<Button className="relative z-10" onClick={onClickHandler}>T</Button>}/>
            <Content>
                <LocationsList />
            </Content>
        </Page>
    )
}