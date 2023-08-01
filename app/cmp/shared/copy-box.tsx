'use client'
import React, { useState } from "react";
import { Check } from 'react-bootstrap-icons'
import Button from "@/components/Button";


export default function CopyBox ({text}: {text: string}) {

    const [copied, setCopied] = useState<boolean>(false)

    function handleCopy () {
        navigator.clipboard.writeText(text)
        setCopied(true)
    }

    return (
        <div className="inline-flex items-center bg-secondary pl-2 gap-x-2 rounded-md overflow-hidden text-sm">
            <Button onClick={handleCopy} color="success" extendClass={'rounded-none min-w-[2.5rem]'}>{copied ? <Check className="text-2xl"/> : 'کپی' }</Button>
            <span className="py-1">{text}</span>
        </div>
    )
}