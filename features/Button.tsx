import cn from 'classnames'
import { HTMLProps } from 'react'

// variants
export const colors = {
    'success': 'bg-green-400 text-white',
    'info': 'bg-blue-400 text-white',
    'danger': 'bg-red-400 text-white',
    'warning': 'bg-yellow-400 text-white',
    'purple': 'bg-purple-400 text-white',
    'default': 'bg-black text-white'
}
// outline variants
const colorsOutlined: typeof colors = {
    success: 'border border-green-500 text-green-500',
    danger: ' border border-red-500 text-red-500',
    default: 'border border-black text-black',
    info: 'border border-blue-500 text-blue-500',
    warning: 'border border-yellow-500 text-yellow-500',
    purple: 'border border-purple text-purple-500'
}

export type Color = typeof colors 

interface Props extends HTMLProps<HTMLButtonElement> {
    color?: keyof Color,
    outline?: boolean,
    extendClass?: string
    full?: boolean 
}


export default function Button (props: Props) {

    let className = 'py-1.5 px-4 rounded-md flex gap-2 items-center justify-center'

    if(props.extendClass)
        className = cn(className, props.extendClass)
    if(props.full)
        className = cn(className, 'w-full')
    if(props.disabled)
        className = cn(className, 'opacity-50')  

    if(props.outline)
        className = cn(className, colorsOutlined[props.color || 'default'])  
    else 
    className = cn(className, colors[props.color || 'default'])
  
    return (
        <button className={className} {...props}></button>
    )
}


// Icon button 
const iconButtonColors: typeof colors = {
    'success': 'bg-green-50 text-green-500',
    'info': 'bg-blue-50 text-blue-500',
    'danger': 'bg-red-50 text-red-500',
    'warning': 'bg-yellow-50 text-yellow-500',
    'purple': 'bg-purple-50 text-purple-500',
    'default': 'bg-gray-50 text-black'
}
export function IconButton (props: Omit<Props, 'outline'>) {

    let className = 'rounded-full p-2'

    className = cn(className, iconButtonColors[props.color || 'info'])

    return (
        <button className={className} {...props}>
            {props.children}
        </button>
    )
}