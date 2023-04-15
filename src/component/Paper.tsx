import { useState } from "react";
import { Vstack } from "./Common";
import mock from '../mock'
import cn from "classnames";
import { Option } from "@/types";
import { spawn } from "child_process";
import axios from "axios";
enum State {
    Vote,
    Result
}

export default function Paper(props: {options: Option[], pollId: string}) {
    
    const [options, setOptions] = useState(props.options)

    const [state, setState] = useState(State.Vote)
    const [loading, setLoading] = useState(false)

    async function submitVote (index: number) {
        console.log('This is running')
        const pollId = props.pollId 
        const result = await axios.post('/api/submit-vote', {index, id: pollId})
        console.log(result.data)
    }   

    return (
        <Vstack>
            <span>یک گزینه را انتخاب کنید:</span>
            <ul className="flex flex-col space-y-1">
                {loading && 'loading'}
                {options.map((currentItem, index) => (
                    <li className="bg-gray-100 px-4 py-2 rounded-md relative text-sm" onClick={() => submitVote(index)}>
                        <div className={cn('h-full w-full absolute top-0 right-0 bg-black rounded-md duration-500 text-white')} style={{width: currentItem.result>= 0 ? currentItem.result+'%' : 0}}/>
                        {/* <span className="absolute left-2 invert mix-blend-difference">{currentItem.result}%</span> */}
                        <span className="invert mix-blend-difference">{currentItem.title}</span>
                    </li>
                ))}
            </ul>
        </Vstack>
    )
}