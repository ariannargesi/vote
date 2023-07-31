import React, { useState } from 'react'
import Button from '../../../components/Button'
import TextareaAutosize from 'react-textarea-autosize'
import { className } from '../shared/input'

export default function WriteComment () {

    const [value, setValue] = useState<string>('')

    return (
        <div className='flex items-center gap-x-1'>
            <TextareaAutosize 
                value={value} 
                onChange={event => setValue(event.target.value)} 
                className={`w-full p-1.5 bg-secondary outline-none`} 
                placeholder='نظرت رو بگو...'
            />
            <Button disabled={!value} extendClass='text-blue-200'>بفرست</Button>
        </div>
    )
}