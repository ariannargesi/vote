import mock from "@/mock"
import Avatar from "../Avatar"
import { Hstack, Vstack } from "../Common"
import PointCounter from "../Score"
import Button, { IconButton } from "../Button"
import { Reply, Share, Trash } from "react-bootstrap-icons"
import Badge from "../Badge"
import useToggle from "@/hooks/useToggle"
import { Textarea } from "../form"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { ReponseType } from "@/pages/api/get-comments"

export default function CommentsList(props: { pollId: string }) {

    const [list, setList] = useState<[] | null>(null)
    const [page, setPage] = useState(1)
    const [showReplyInput, toggleReplyInput] = useToggle(false)
    const hasHasMore = useRef(null)

    useEffect(() => {
        const endpoint = "/api/get-comments?page=" + page + '&pollId=' + props.pollId
        axios.get<ResponseType>(endpoint)
            .then(response => {
                setList(response.data.commentsList)
                console.log(response.data.commentsList)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    if(list === null)
        return null 
    
    return list.map(currentItem => {
        return (
            <Vstack key={Math.random()}>
                <Hstack>
                    <Avatar src="https://picsum.photos/48" circle />
                    <span>علی انصاری</span>
                </Hstack>
                <div>
                    <div className="flex">
                        <p className="text-gray-500">{currentItem.comment}</p>
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
        )
    })
}

