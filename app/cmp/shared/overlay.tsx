import cn from 'classnames'
import { HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
    active: boolean, 
    children: ReactNode
}

export default function Overlay (props: Omit<Props, 'className'>) {
    let container =
    "bg-black/40 backdrop-blur-sm h-full max-w-3xl w-full duration-150 fixed top-0 left-0 right-0 mx-auto";
    if(props.active === false)
        container = cn(container, 'opacity-0')
    return (
        <div className={container} {...props}>
            {props.children}           
        </div>
    )
}