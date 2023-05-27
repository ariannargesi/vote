import { ChevronLeft } from "react-bootstrap-icons";
import { Label } from "../form";
import { Hstack } from "../Common";
import Button, { IconButton } from "../Button";
import Badge from "../Badge";
import { useEffect, useRef, useState } from "react";
import { log } from "console";
import TextareaAutosize from 'react-textarea-autosize';
import { after } from "node:test";
import axios from "axios";

export default function NewComment(props: {pollId: string}) {

    const inputRef = useRef<HTMLTextAreaElement>(null)
    
    const submitComment = async () => {
        const value = inputRef.current?.value
        const endpoint = "/api/submit-comment"
        const body = {
            comment: value,
            pollId: props.pollId,
        }
        try {
            await axios.post(endpoint, body)
            inputRef.current!.value = ''
            alert('ذخیره شد!')
        }catch(error){
            alert('یه مشکلی پیش اومده')
        }
    }

    return (
        <div className="border-t">
            <label>ثبت نظر</label>
            <Hstack>
                <TextareaAutosize
                    ref={inputRef}
                    className="flex-auto bg-gray-100 border shadow-sm rounded-md p-2"
                    minLength={3}
                    maxLength={1024}
                />   
                <Button onClick={submitComment}>بفرست</Button>
            </Hstack>
        </div>
    )
}