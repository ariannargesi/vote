import React from 'react'
import cn from 'classnames'
import { ReactNode } from "react";

export default function List ({children}: {children: ReactNode}) {

    return (
        <ul className=" h-[94%] overflow-y-scroll pl-3 mt-3">
            {children}
        </ul>
    )
}

List.ListItem = ListItem

function ListItem ({children, active}: {children: ReactNode, active?: boolean}) {
    let className = 'border-b border- border-b-white mb-2 pb-1 focus:bg-primary'
    if(active)
        className = cn(className, 'border-b-green-400 text-green-400')
    return (
        <li className={className}>{children}</li>
    )
}
