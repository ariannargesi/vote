import { Operator } from '@/types'
import axios from 'axios'
import { TriangleFill } from 'react-bootstrap-icons'
 
export default function PointCounter (props: {pollId: string}) {

    let fontSize = props.sm ? 20 : 28 

    async function submitScore(operator: Operator){
        const body = {
            id: props.pollId,
            operator 
        }
        const result = await axios.post('/api/submit-score', body)
    }


    return (
        <div className='text-center '>
            <TriangleFill size={fontSize} fill='darkgray' onClick={() => submitScore(Operator.Plus)}/>
            <span style={{fontSize: fontSize - 4}}>48+</span>
            <TriangleFill size={fontSize} fill='darkgray' className='rotate-180' onClick={() => submitScore(Operator.Minus) }/>
        </div>
    )
}

