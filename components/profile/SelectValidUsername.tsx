import { useState, ChangeEvent, useRef } from "react";
import Input, { Label } from "../form";
import Spinner from "../Spinner";
import axios from "axios";
import { CheckUsernameResponseType } from "@/pages/api/check-username";

enum HintType {
    success = 'success',
    error = 'error'
}

export default function SelectUsername(props: { onChange: (value: boolean) => void, name: string }) {

    const [value, setValue] = useState('')
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
        props.onChange(false)
        
        checkUsername(value, lastRequestKey.current, (isValid, requestKey) => {
            if (requestKey != lastRequestKey.current)
                return
            if (isValid) setHint(HintType.success)
            else
                if (value.length < 3)
                    setHint(null)
                else setHint(HintType.error)

            setLoading(false)
            props.onChange(isValid)
        })
        setValue(value)
    }
    return (
        <>
            <br />
            <Label>نام کاربری</Label>
            <Input value={value} onChange={handleChange} name={props.name} maxLength={64} />
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

