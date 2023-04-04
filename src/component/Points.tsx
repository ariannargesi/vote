import { TriangleFill } from 'react-bootstrap-icons'
 
const selectedColor = 'blue'
const defaultColor = 'lightgray'

export default function PointCounter (props) {

    let fontSize = props.sm ? 20 : 28 

    return (
        <div className='text-center '>
            <TriangleFill size={fontSize} fill='darkgray'/>
            <span style={{fontSize: fontSize - 4}}>48+</span>
            <TriangleFill size={fontSize} fill='darkgray' className='rotate-180'/>
        </div>
    )
}

