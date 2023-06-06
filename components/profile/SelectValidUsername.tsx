import { useState, ChangeEvent, useRef } from "react";
import { Label, Input } from "../form";
import Spinner from "../Spinner";
import axios from "axios";
import { CheckUsernameResponseType } from "@/pages/api/check-username";

enum HintType {
    success = 'success',
    error = 'error'
}

export default function SelectUsername(props: { onChange: (isValid: boolean, value: string) => void, value?: string, defaultValue?: string }) {

    const [value, setValue] = useState(props.value)
    const [hint, setHint] = useState<null | HintType>(null)
    const [loading, setLoading] = useState(false)

    const lastRequestKey = useRef<number | null>(null)

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        let value = event.target.value
        
        
        
        if (value.indexOf(' ') > -1)
            value = value.replace(' ', '-')

        lastRequestKey.current = Math.random()
        setHint(null)
        setLoading(true)
        if(props.onChange)
            props.onChange(false, '')
        if(props.defaultValue !== value)
            checkUsername(value, lastRequestKey.current, (isValid, requestKey) => {
                if (requestKey != lastRequestKey.current)
                    return
                if (isValid) setHint(HintType.success)
                else
                    if (value.length < 3)
                        setHint(null)
                    else setHint(HintType.error)

                setLoading(false)
                if(props.onChange)
                    props.onChange(
                        isValid,
                        value
                    )
            })
        else setLoading(false)
        setValue(value)
    }
    return (
        <>
            <Label>نام کاربری</Label>
            <Input value={value} onChange={handleChange} maxLength={32} />
            <div className="h-4 mt-1">
                {loading && <Spinner />}
                {hint === HintType.success &&
                    <span className="text-sm text-green-500">میتونی این اسم رو انتخاب کنی!</span>
                }
                {hint === HintType.error &&
                    <span className="text-sm text-red-500">این اسم قبلا انتخاب شده!</span>
                }
            </div>
        </>
    )
}

async function checkUsername(username: string, requestKey: number, callback: (value: boolean, requestKey: number) => void) {
    let data = undefined
    if (username.length < 3)
        data = false
    else
        data = (await axios.post<CheckUsernameResponseType>('/api/check-username', { username })).data.isValid
    
    callback(data as boolean, requestKey)
}

