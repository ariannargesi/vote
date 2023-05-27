import cn from 'classnames'
import { HTMLProps } from 'react'
import { Color } from './Button'
// variants
const colors: Color = {
    'success': 'bg-green-50 text-green-500',
    'info': 'bg-blue-50 text-blue-500',
    'danger': 'bg-red-50 text-red-500',
    'warning': 'bg-yellow-50 text-yellow-500',
    'purple': 'bg-purple-50 text-purple-500',
    'default': 'bg-gray-50 text-black'
}


interface Props extends HTMLProps<HTMLSpanElement> {
    color?: keyof Color,
}

export default function Button (props: Props) {

    let className = 'flex gap-x-2 px-4 py-1.5 rounded-full'
    className = cn(className, colors[props.color || 'default'])
  
    return (
        <span className={className} {...props}>{props.children}</span>
    )
}