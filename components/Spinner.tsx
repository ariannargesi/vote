import cn from 'classnames'
import { HTMLProps } from 'react'
import { Circle } from 'react-bootstrap-icons'

// variants
const sizes = {
    'sm': 'w-5 h-5',
    'md': 'w-8 h-8',
}

type Size = keyof typeof sizes

interface Props extends HTMLProps<HTMLImageElement> {
    size?: Size,
}

export default function Avatar (props: Props) {

    let className = 'border border-2 border-blue-400 border-r-white animate-spin-fast  rounded-full'

    className = cn(className, sizes[props.size || 'sm'])
  
    return (
        <div className={className}/>
    )
}