import { ReactNode } from "react";
import cn from 'classnames'
import React from 'react'

export default function Content ({children, extendClass}: {children: ReactNode, extendClass?:string}) {

    let className="h-full overflow-scroll relative"
    if(extendClass)
        className = cn(className, extendClass)

    return (
        <div className={className}>
            {children}
        </div>
    )
}