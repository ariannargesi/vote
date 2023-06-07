import { useState, ChangeEvent, useRef } from "react";
import { Label, Input } from "../form";
import Spinner from "../Spinner";
import axios from "axios";
import { CheckUsernameResponseType } from "@/pages/api/check-username";

enum HintType {
    success = 'success',
    error = 'error',
    short = 'short'
}

export default function SelectUsername(props: { onChange: (isValid: boolean, value: string) => void, value?: string, defaultValue?: string }) {

    const [value, setValue] = useState(props.value)
    const [hint, setHint] = useState<null | HintType>(null)
    const [loading, setLoading] = useState(false)

    const lastRequestKey = useRef<ReturnType<typeof setTimeout> | null>(null)


    /**
     * handle input change 
     * what this function is doing?
     *  1- replace white space with dash 
     *  2- clear hint state 
     *  3- notify parent component about the changes,
     *      parent might need to disable the submit button if browser is waiting for the response 
     *  4- clear previous timeout (the goal is to send one request for getting data)
     *  5- if entered username is different with user actual username 
     *      and the length of input value if higher then 3, set the timeout for sending the request.
     *     if the length was shorter then 3, show a message 
     *  TIMEOUT: 
     *      if username is valid, show valid message 
     *      if username is not valid, show inavlid message 
     *      and in both cases, notify parent component and disable loading
     */
    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        let value = event.target.value
        if (value.indexOf(' ') > -1)
            value = value.replace(' ', '-')

        setHint(null)

        if (props.onChange)
            props.onChange(false, '')

        if (lastRequestKey.current)
            clearTimeout(lastRequestKey.current)
        if (props.defaultValue != value) 
            if (value.length < 3)
                setHint(HintType.short)
            else {
                setLoading(true)
                lastRequestKey.current = setTimeout(async () => {
                    const isValid = await checkUsername(value)
                    if (isValid) setHint(HintType.success)
                    else setHint(HintType.error)
                    if (props.onChange)
                        props.onChange(
                            isValid,
                            value
                        )
                    setLoading(false)
                }, 500)
            }
        
        setValue(value)
    }
    return (
        <>
            <Label>نام کاربری</Label>
            <Input value={value} onChange={handleChange} maxLength={32} />
            <div className="h-4 mt-1">
                {loading && <Spinner />}
                {
                    hint === HintType.success &&
                    props.value != props.defaultValue &&
                    <span className="text-sm text-green-500">میتونی این اسم رو انتخاب کنی!</span>
                }
                {hint === HintType.error &&
                    <span className="text-sm text-red-500">این اسم قبلا انتخاب شده!</span>
                }
                {hint === HintType.short &&
                    <span className="text-sm text-red-500">اسم باید حداقل ۳ کاراکتر باشه!</span>
                }
            </div>
        </>
    )
}

async function checkUsername(username: string) {
    let data = undefined
    if (username.length < 3)
        data = false
    else
        data = (await axios.post<CheckUsernameResponseType>('/api/check-username', { username })).data.isValid
    return data
}

