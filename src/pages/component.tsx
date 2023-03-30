import { stat } from "fs"
import { useState } from "react"
import { Stream } from "stream"

const options = [
    'وظیفه مردم',
    'وظیفه شهردار',
    'وظیفه دیگر نهاد',
    'در کامنت میگویم'
]

const classNames = {
    container: '',
    li: 'px-3 py-3.5 bg-gray-100 my-1.5 rounded-md border relative'
}

enum Status {
    View,
    Result
}

export function Spinner(props) {
    return (
        <div className="w-6 h-6 border border-2 border-blue-400 rounded-full border-r-white animate-spin-fast duration-500 float-left">

        </div>
    )
}

export function OptionLi(props) {

    let widthClass = ''

    if (props.state === Status.View)
        widthClass = '0%'
    else if (props.state === Status.Result)
        widthClass = props.result + '%'

    if (props.state === Status.Result)
        console.log(widthClass);

    return (
        <li className={classNames.li} onClick={props.onClick}>
            <div className={`h-2 bg-gray100-100 absolute right-0 bottom-0 transition-[width] rounded-md`} style={{ width: widthClass }} ></div>
            <span className={props.result ? 'invert' : 'invert-0'}>{props.children}</span>
        </li>
    )
}

export default function Component(props) {

    const [state, setState] = useState(Status.View)
    const [resultData, setResultData] = useState(undefined)
    const [loading, setLoading] = useState(false)

    function chooseHandler() {
        if (loading === false && state === Status.View) {
            setLoading(true)
            fetchData('voteID', (data) => {
                setResultData(data)
                setLoading(false)
                setState(Status.Result)
            })
        }
    }

    return (
        <div className={classNames.container}>
            <div className="relative h-32 w-64 bg-white" style={{ mixBlendMode: 'difference' }}>
                <div className="h-full absolute top-0 w-full left-0">
                    <div className="w-1/2 bg-black h-full inline-block"></div>
                    <div className="w-1/2 border bg-gray-100 h-full inline-block"></div>
                </div>
                <h1 className="invert text-xl" style={{mixBlendMode: 'difference'}}>Hello this is some</h1>
            </div>
            <span>انتخاب کنید:</span>
            {loading && <Spinner />}
            <ul>
                {options.map((currentItem, index) => (
                    <OptionLi onClick={chooseHandler} result={resultData && resultData[index]} state={state}>- {currentItem}</OptionLi>
                ))}
            </ul>
        </div>
    )
}


function fetchData(arg0: string, callback) {

    return setTimeout(() => {
        callback([
            24,
            54,
            10,
            12
        ])
    }, 1000)

}

