import { ReactNode } from "react"
import React from 'react'

export default function Header (props: {title?: string, end?: ReactNode}) {

    if(Object.entries(props).length === 0)
        return null 

    const {title, end} = props 

    let className = "px-3 py-2 border-b border-black flex"
    
    return (
        <header className={className}>
            {title && <h1 className="text-center font-bold text-xl">{title}</h1> }
            {end && <div className="mr-auto">{end}</div>}
        </header>
    )
}