import classNames from 'classnames'
import cn from 'classnames'
import React from 'react'
import { HTMLProps, MouseEventHandler, forwardRef, useEffect } from 'react'

export const className = 'focus:ring-1 focus:ring-green-400 focus:outline-none w-full p-1.5 shadow-sm rounded-md'

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'className'> & {dark: boolean}

type TextAreaProps = Omit<HTMLProps<HTMLTextAreaElement>, 'className'>
interface LabelProps extends Omit<HTMLProps<HTMLLabelElement>, 'className'> {
    sm?: boolean
    cn?: string
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input {...props} className={cn(className, props.dark ? 'bg-primary' : "bg-secondary")} ref={ref} />
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
    <textarea {...props} className={cn(className, 'h-56',props.dark ? 'bg-primary' : "bg-secondary")} ref={ref} />
))

export function Label(props: LabelProps) {

    let className = classNames(cn('block mb-1 mt-3', props.cn))

    return (
        <label className={className} {...props} />
    )
}

export function Switch(props: { value: boolean; onChange: MouseEventHandler<HTMLDivElement> }) {

    return (
        <div
            className={cn('w-16 h-6 rounded-full border flex relative items-center', props.value ? 'bg-green-300' : 'bg-gray-100')}
            onClick={props.onChange}
        >
            <div
                className={
                    cn('rounded-full bg-white h-5 w-5 absolute border', props.value ? 'left-0' : 'right-0')}
            ></div>
        </div>
    )
}
