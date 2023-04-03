import cn from 'classnames'
import { HTMLProps } from 'react'

const gaps = {
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-8'
}

type Gap = keyof typeof gaps 

interface Props extends HTMLProps<HTMLDivElement> {
    gap?: Gap 
}

export function Hstack (props: Props) {

    let className = 'flex items-center self-stretch flex-wrap'

    className = cn(className, gaps[props.gap || 'sm'])

    return (
        <div className={className} {...props}>
            {props.children}
        </div>
    )
}

export function Vstack (props: Props) {

    let className = 'flex flex-col self-stretch flex-auto'
    className = cn(className, gaps[props.gap || 'sm'])
    return (
        <div className={className} {...props}>
            {props.children}
        </div>
    )
}