import { useEffect, useState } from "react";
import { Vstack } from "./Common";
import cn from "classnames";
import axios from "axios";
import Spinner from './Spinner'

type Result = { value: number }[]

type Props = {
    options: string[],
    pollId: string,
    results: Result,
    votesCount: number,
    userVote: number
}

const getCountMessage = (count: number): string => {
    let str
    switch (count) {
        case 0:
            str = 'هنوز کسی در این رای‌گیری شرکت نکرده است.'
            break;
        case 1:
            str = 'یک نفر در این رای‌گیری شرکت کرده است!'
            break;
        default:
            str = `${count} نفر در این رای‌گیری شرکت کرده‌اند.`
    }
    return str
}

const getLabel = (userVote: number | undefined): string => {
    let str
    if (typeof userVote === 'number') {
        str = 'قبلا در این رای‌گیری شرکت کرده اید!'
    } else {
        str = 'یک گزینه را انتخاب کنید.'
    }
    return str
}

export default function Paper(props: Props) {
    const [results, setResult] = useState<Result | null>(null)
    const [loading, setLoading] = useState(false)
    const [votesCount, setVotesCount] = useState(props.votesCount)
    const [userVote, setUserVote] = useState(props.userVote)
    
    useEffect(() => {
        setTimeout(() => {
            if (props.results)
                setResult(props.results)
        })
    }, [])

    async function submitVote(index: number) {
        if (results) {
            alert('شما قبلا در این رای‌گیری شرکت کردید!')
            return
        }
        const endpoint = "/api/submit-vote"
        const body = {
            pollId: props.pollId,
            index
        }
        try {
            setLoading(true)
            const response = await axios.post(endpoint, body)
            setResult(response.data)
            setVotesCount(votesCount => votesCount+1)
            setUserVote(index)
        } catch (e) {
            alert('یه مشکلی پیش اومده!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Vstack>
            <div className="flex space-x-4">
                <span>{getLabel(userVote)}</span>
                {loading && <Spinner />}
            </div>
            <ul className="flex flex-col space-y-1">
                {props.options.map((currentItem, index) => (
                    <li className={"bg-gray-100 px-4 py-2 rounded-md relative text-sm"} onClick={() => submitVote(index)}>
                        <div className={cn('h-full w-full absolute top-0 right-0 bg-black rounded-md duration-500 text-white')} style={{ width: (results ? results[index] ? results[index]!.value : 0 : 0) + '%' }} />
                        {results && <span className="absolute left-2 invert mix-blend-difference"> {results[index] ? results[index]!.value : 0}%</span>}
                        <span className="invert mix-blend-difference">
                            {currentItem}
                        </span>
                        {userVote === index && <span className="text-sm text-green-400 relative z-10"> (رای شما)</span>}
                    </li>
                ))}
            </ul>
            <span className="text-sm">{getCountMessage(votesCount)}</span>
        </Vstack>
    )
}