import useToggle from '@/hooks/useToggle'
import cn from 'classnames'
import { forwardRef, useEffect } from 'react'
import { ToggleLeft } from 'react-feather'

export const className = 'bg-gray-100 w-full p-1.5 border border-gray-200 shadow-sm rounded-md mb-0.5'



export default forwardRef((props, ref) => {
    return (
        <input {...props} className={className} ref={ref} />
    )
})

export const Textarea = forwardRef((props, ref) => {
    return (
        <textarea {...props} className={cn(className, 'h-24')} ref={ref} />
    )
})

export function Label(props) {

    let className = 'block mb-1'
    if (!props.sm)
        className = cn(className, 'text-lg')

    return (
        <label {...props} className={className}>

        </label>
    )
}

export function Switch(props) {

    return (
        <div 
        className={cn('w-24 h-10 rounded-full border flex relative items-center', props.value ? 'bg-green-300' : 'bg-gray-100')} 
        onClick={props.onChange}
        >
            <div
                className={
                    cn('rounded-full bg-white h-9 w-9 absolute border', { ['left-0']: props.value, ['right-0']: props.value === false })}
            ></div>
        </div>
    )
}