import { useState } from "react";
import { Vstack } from "./Common";
import mock from '../mock'
import cn from "classnames";
import { spawn } from "child_process";
enum State {
    Vote,
    Result
}

export default function Paper(props) {
    
    const [options, setOptions] = useState(props.options)

    const [state, setState] = useState(State.Vote)
    const [loading, setLoading] = useState(false)

    function handleClick () {
        setLoading(true)
        setOptions(fetchData())
        setLoading(false)
    }

    return (
        <Vstack>
            <span>یک گزینه را انتخاب کنید:</span>
            <ul className="flex flex-col space-y-1">
                {loading && 'loading'}
                {options.map(currentItem => (
                    <li key={currentItem.id} className="bg-gray-100 px-4 py-2 rounded-md relative text-sm" onClick={handleClick}>
                        <div className={cn('h-full w-full absolute top-0 right-0 bg-black rounded-md duration-500 text-white')} style={{width: currentItem.result>= 0 ? currentItem.result+'%' : 0}}/>
                        <span className="absolute left-2 invert mix-blend-difference">{currentItem.result}%</span>
                        <span className="invert mix-blend-difference">{currentItem.title}</span>
                    </li>
                ))}
            </ul>
        </Vstack>
    )
}

function fetchData() {
    const options = mock.vote.options.map(currentItem => {
        return {
            ...currentItem,
            result: Math.round(Math.random() * 100)
        }
    })
    return options 
}
