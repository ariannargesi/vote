import cn from 'classnames'
import { HTMLProps, MouseEventHandler, forwardRef, useEffect } from 'react'

export const className = 'bg-gray-100 w-full p-1.5 border border-gray-200 shadow-sm rounded-md mb-0.5'

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'className'>
type TextAreaProps = Omit<HTMLProps<HTMLTextAreaElement>, 'className'>
interface LabelProps extends Omit<HTMLProps<HTMLLabelElement>, 'className'> {
    sm?: boolean 
}

export default forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input {...props} className={className} ref={ref} />
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
    <textarea {...props} className={cn(className, 'h-18')} ref={ref} />
))

export function Label(props: LabelProps) {

    let className = 'block mb-1'
    if (!props.sm)
        className = cn(className, 'text-lg')

    return (
        <label className={className} {...props}/>

    )
}

export function Switch(props: { value: boolean; onChange: MouseEventHandler<HTMLDivElement> }) {

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

