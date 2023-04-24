import cn from 'classnames'
import { HTMLProps } from 'react'

const gaps = {
    'none': '', // equal with gap-0
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-8'
}

type Gap = keyof typeof gaps 

interface Props extends HTMLProps<HTMLDivElement> {
    gap?: Gap
    itemsCenter?: boolean,
    justifyCenter?: boolean 
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

    if(props.itemsCenter)
        className = cn(className, 'items-center')

    className = cn(className, gaps[props.gap || 'sm'])
    return (
        <div className={className} {...props}>
            {props.children}
        </div>
    )
}