import cn from 'classnames'
import { HTMLProps } from 'react'

// variants
export const colors = {
    'primary': 'bg-primary text-white focus:bg-secondary',
    'success': 'bg-green-400 text-white focus:bg-green-500',
    'info': 'bg-blue-400 text-white focus:bg-blue-500',
    'danger': 'bg-danger text-white focus:bg-danger',
    'warning': 'bg-yellow-400 text-white focus:bg-yellow-500',
    'purple': 'bg-purple-400 text-white focus:bg-purple-500',
    'default': 'bg-white text-black'
}

const sizes = {
    'sm': ' px-2',
    'md': 'py-1.5 px-4',
    'lg': 'p-6'
}

// outline variants
const colorsOutlined: typeof colors = {
    primary: 'border border-primary text-primary',
    success: 'border border-green-500 text-green-500',
    danger: ' border border-danger text-danger',
    default: 'border border-white text-white',
    info: 'border border-blue-500 text-blue-500',
    warning: 'border border-yellow-500 text-yellow-500',
    purple: 'border border-purple text-purple-500'
}

export type Color = typeof colors 
export type Size = typeof sizes 

interface Props extends HTMLProps<HTMLButtonElement> {
    color?: keyof Color,
    size?: keyof Size,
    outline?: boolean,
    extendClass?: string
    full?: boolean 
}


export default function Button (props: Props) {

    let className = ' rounded-md flex gap-2 items-center justify-center disabled:opacity-40 duration-100  min-h-[34px] '

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

    className = cn(className, sizes[props.size || 'sm'])
  
    return (
        <button className={className} {...props}></button>
    )
}




// Icon button 
const iconButtonColors: typeof colors = {
    'success': 'bg-green-50 text-green-500',
    'primary': 'bg-blue-50 text-blue-500',
    'danger': 'bg-red-50 text-red-500',
    'warning': 'bg-yellow-50 text-yellow-500',
    'purple': 'bg-purple-50 text-purple-500',
    'default': 'bg-gray-50 text-black'
}


export function IconButton (props: Omit<Props, 'outline'>) {

    let className = 'rounded-full'

    className = cn(className, iconButtonColors[props.color || 'primary'])
    className = cn(className, sizes[props.size || 'sm'])
    console.log(className)
    return (
        <button className={className} {...props}>
            {props.children}
        </button>
    )
}