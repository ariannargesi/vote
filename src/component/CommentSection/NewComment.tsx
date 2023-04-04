import { ChevronLeft } from "react-bootstrap-icons";
import { Label } from "../form";
import { Hstack } from "../Common";
import Button, { IconButton } from "../Button";
import Badge from "../Badge";
import { useEffect, useRef, useState } from "react";
import { log } from "console";
import TextareaAutosize from 'react-textarea-autosize';

export default function NewComment() {

    const [value, setValue] = useState('')

    return (
        <div className="border-t">
            <label>ثبت نظر</label>
            <Hstack>
                <TextareaAutosize
                    onChange={e => setValue(e.target.value)} 
                    className="flex-auto bg-gray-100 border shadow-sm rounded-md p-2"
                />
                
                <Button>بفرست</Button>
            </Hstack>
        </div>
    )
}