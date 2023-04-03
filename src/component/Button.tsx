import cn from 'classnames'
import { HTMLProps } from 'react'

// variants
const colors = {
    'success': 'bg-green-400 text-white',
    'danger': 'bg-red-400 text-white',
    'default': 'bg-black text-white'
}
// outline variants
const colorsOutlined: typeof colors = {
    success: 'border border-green-500 text-green-500',
    danger: ' border border-red-500 text-red-500',
    default: 'border border-black text-black'
}

type Color = keyof typeof colors 

interface Props extends HTMLProps<HTMLButtonElement> {
    color?: Color,
    outline?: boolean,
}

export default function Button (props: Props) {

    let className = 'py-1.5 px-4 rounded-md flex gap-2 items-center justify-center'


    if(props.outline)
        className = cn(className, colorsOutlined[props.color || 'default'])    
    else 
    className = cn(className, colors[props.color || 'default'])
  
    return (
        <button className={className} {...props}></button>
    )
}