import cn from 'classnames'
import { HTMLProps } from 'react'

// variants
const sizes = {
    'sm': 'w-12 h-12',
    'md': 'w-24 h-24',
    'lg': 'w-36 h-36'
}

type Size = keyof typeof sizes

interface Props extends HTMLProps<HTMLImageElement> {
    size?: Size,
    src?: string
}

export default function Avatar (props: Props) {

    let className = 'shadow-md rounded-md'

    className = cn(className, sizes[props.size || 'sm'])
  
    return (
        <img className={className} {...props} ></img>
    )
}