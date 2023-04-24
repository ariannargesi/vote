import mock from "@/mock"
import Avatar from "../Avatar"
import { Hstack, Vstack } from "../Common"
import PointCounter from "../Score"
import Button, { IconButton } from "../Button"
import { Reply, Share, Trash } from "react-bootstrap-icons"
import Badge from "../Badge"
import useToggle from "@/hooks/useToggle"
import { Textarea } from "../form"

export function Thread(props) {
    const [showReplyInput, toggleReplyInput] = useToggle(false)

    function handleReply(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.")
    }

    return (
        <div className="py-4">
            <Vstack>
                <Hstack>
                    <Avatar src="https://picsum.photos/48" circle />
                    <span>علی انصاری</span>
                </Hstack>
                <div>
                    <div className="flex">
                        <p className="text-gray-500">{mock.vote.comments[0].content}</p>
                        <PointCounter sm />
                    </div>
                    <span className="text-sm text-gray-400 underline">مشاهده ۴۵ جواب</span>
                </div>
                <Hstack>
                    <button onClick={toggleReplyInput}>
                        <Badge color="purple"><Reply /></Badge>
                    </button>
                </Hstack>
                {showReplyInput && (
                    <Vstack>
                        <span>در پاسخ به <span className="text-blue-400">علی انصاری</span></span>
                        <Textarea />
                        <Button color="success">بفرست</Button>
                    </Vstack>
                )}
            </Vstack>
            {props.nested < 2 && (<div className="mr-8"><Thread nested={1+props.nested} /></div>)}
        </div>
    )
}


export default function CommentSection(props) {
    return (
        <div className="divide-y divide-slate-200">
            <Thread nested={0}/>
        </div>
    )
}