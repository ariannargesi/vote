import React, { ReactNode } from "react"
import cn from 'classnames'
import { HTMLProps, Colors } from "@/types"

interface Props extends HTMLProps<HTMLSpanElement> {
    extraClassName?: string,
    color: keyof Colors,
    children: ReactNode
}

export default function Badge ({children, extraClassName, color }: Props) {

    const badgeColors: Colors = {
        primary: "",
        success: "bg-green-400 bg-opacity-20 text-green-500",
        info: "",
        danger: "",
        warning: "",
        default: "bg-primary"
    }

    let className = 'rounded-lg py-1 px-3'

    if(color)
        className = cn(className, badgeColors[color])

    className = cn(className, extraClassName)
    return (
        <span className={className}>
            {children}
        </span>
    )
}
