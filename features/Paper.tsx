import { ReactNode, useEffect, useRef, useState } from "react";
import { Vstack } from "./Common";
import cn from "classnames";
import axios from "axios";
import Spinner from './Spinner'
import Button from "./Button";
import { Link } from "react-bootstrap-icons";

type Result = { value: number }[]

type Props = {
    options: string[],
    pollId: string,
    results: Result,
    votesCount: number,
    userVote: number,
    userState: string | null
    pollState: string | null,

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

enum ISSUES {
    NO_STATE,
    DIFF_STATE
}
function UpdateState() {
    return (
        <span>
            شما هنوز استان خود را انتخاب نکرده‌اید!‌<Link href="/edit-profile"></Link>
        </span>
    )
}

function DiffState(props: { pollState: string }) {
    return (
        <span className="text-red-600 text-lg">
            این رای‌گیری برای ساکنان استان {props.pollState} میباشد!
        </span>
    )
}

export default function Paper(props: Props) {
    const [results, setResult] = useState<Result | null>(null)
    const [loading, setLoading] = useState(false)
    const [votesCount, setVotesCount] = useState(props.votesCount)
    const [userVote, setUserVote] = useState(props.userVote)
    const [isAllowed, setIsAllowed] = useState<{ isAllowed: boolean, type?: ISSUES }>({ isAllowed: true })

    useEffect(() => {
        if (props.pollState) {
            if (props.userState === null) {
                setIsAllowed({
                    isAllowed: false,
                    type: ISSUES.NO_STATE
                })
            }
            else if (props.pollState != props.userState) {
                setIsAllowed({
                    isAllowed: false,
                    type: ISSUES.DIFF_STATE
                })
            }
            else {
                // allow him 
                setIsAllowed({
                    isAllowed: true
                })
            }
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (props.results)
                setResult(props.results)
        })
    }, [])

    async function submitVote(index: number) {
        if(isAllowed.isAllowed === false) return 
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
            setVotesCount(votesCount => votesCount + 1)
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
                {isAllowed.isAllowed === false &&
                    isAllowed.type === ISSUES.NO_STATE &&
                    <UpdateState />}
                {isAllowed.isAllowed === false &&
                    isAllowed.type === ISSUES.DIFF_STATE &&
                    <DiffState pollState={props.pollState!} />
                }
                {isAllowed.isAllowed && <span>{getLabel(userVote)}</span>}
                {loading && <Spinner />}
            </div>
            <ul className="flex flex-col space-y-1">
                {props.options.map((currentItem, index) => (
                    <li key={index} className={"bg-gray-100 px-4 py-2 rounded-md relative text-sm"} onClick={(event) => {
                        if (isAllowed.isAllowed === false)
                            event.preventDefault()
                        submitVote(index)
                    }
                    }>
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