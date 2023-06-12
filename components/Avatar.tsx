import cn from 'classnames'
import { HTMLProps } from 'react'
import { Circle, Person, PersonCircle } from 'react-bootstrap-icons'

// variants
const sizes = {
    'sm': 'w-12 h-12',
    'md': 'w-24 h-24',
    'lg': 'w-36 h-36'
}

type Size = keyof typeof sizes

interface Props extends HTMLProps<HTMLImageElement> {
    size?: Size,
    circle?: boolean 
}

export default function Avatar (props: Props) {

    let className = 'rounded-full'
     
    className = cn(className, sizes[props.size || 'md'])
    className = cn(className, 
        {
            'rounded-md': !props.circle, 
        },
        {
            'rounded-full': props.circle 
        }
        )
    if(!props.src)
        return <div className={cn(className, 'bg-gray-200 flex items-center justify-center')}> <PersonCircle color='white' fontSize={80} /> </div>
    return (
        <img className={className} {...props} ></img>
    )
}