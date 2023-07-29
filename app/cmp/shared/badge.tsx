import React, { ReactNode } from "react"
import cn from 'classnames'

export default function Badge ({children, extraClassName}: {children: ReactNode, extraClassName?: string}) {
    let className = 'rounded-lg bg-primary py-0.5 px-3 text-sm text-gray-400'
    className = cn(className, extraClassName)
    return (
        <span className={className}>
            {children}
        </span>
    )
}
