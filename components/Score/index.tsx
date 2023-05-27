import { Operator } from '@/types'
import axios from 'axios'
import { TriangleFill } from 'react-bootstrap-icons'
import { useState } from 'react'

const endPoint = '/api/submit-score'
const removeScoreEndPoint = '/api/remove-score'

type ScoreRequest = {
    id: string,
    operator: Operator
}

function takeScoreBack(pollId: string, callback: () => void) {
    axios.post('/api/remove-score', pollId)
    .then((data) => {
        console.log(data)
        callback()
    })
    .catch(error => {
        alert('یه مشکلی پیش اومده!')
    })
}

function submitScore (pollId: string, operator:Operator, callback: () => void) {
    axios.post<undefined, undefined, ScoreRequest>('/api/submit-score', {operator, id: pollId })
    .then(response => {
        console.log(response)
        callback()
    })
    .catch(error => {
        alert('یه مشکلی پیش اومده!')
    })
} 

export default function Score(props: { pollId: string, score: number, sm?: boolean, scoreDir: Operator | undefined }) {

    const [score, setScore] = useState(props.score)
    const [scoreDir, setScoreDir] = useState<Operator | undefined>(props.scoreDir)

    let fontSize = props.sm ? 20 : 28

    function handleScoreUp() {
        if (scoreDir)
            if(scoreDir === Operator.Plus)
                takeScoreBack(props.pollId, () => {
                    setScore(prev => prev - 1)
                    setScoreDir(undefined)
                })
            else {
                alert('قبلا در جهت مخالف رای دادی!')
            }
        else
         submitScore(props.pollId, Operator.Plus, () => {
            setScore(oldScore => oldScore + 1)
            setScoreDir(Operator.Plus)
        })
    }

    function handleScoreDown(): void {

        if (scoreDir)
            if (scoreDir === Operator.Minus)
                takeScoreBack(props.pollId, () => {
                    setScore(prev => prev + 1)
                    setScoreDir(null)
                })
            else {
                alert('قبلا در جهت مخالف رای دادی!')
            }
        else {
            const requestBody: ScoreRequest = {
                pollId: props.pollId,
                operator: Operator.Plus
            }
            submitScore(props.pollId, Operator.Minus, () => {
                setScore(oldScore => oldScore - 1)
                setScoreDir(Operator.Minus)
            })
        }
    }

    return (
        <div className='text-center'>
            <TriangleFill size={fontSize} fill={scoreDir === Operator.Plus ? 'blue' : 'darkgray'} onClick={handleScoreUp} />
            <span style={{ fontSize: fontSize - 4 }}>{score}</span>
            <TriangleFill size={fontSize} fill={scoreDir === Operator.Minus ? 'blue' : 'darkgray'} className='rotate-180' onClick={handleScoreDown} />
        </div>
    )
}

