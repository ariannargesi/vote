import { ReactNode } from "react"
import Overlay from "../overlay"
import Button from "@/features/Button"

export default function Modal(props: {
    footer?: ReactNode,
    content: ReactNode,
    visibility: boolean

}) {

    if (props.visibility === false)
        return null

    return (
        <div 
            className="h-full w-full border border-red-400 
            border-4 absolute top-0 bg-black bg-opacity-50"
        >
            {/* TODO remove this  */}
            <div className="mt-52 
                w-[95%] mx-auto bg-white px-4 py-2 rounded ">
                {props.content}
                {props.footer && (
                    <div className="border-t pt-2 flex gap-x-4">{props.footer}</div>
                )} 
            </div>   
        </div>
    )
}