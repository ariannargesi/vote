import { TriangleFill } from 'react-bootstrap-icons'
 
const fontSize = 36 
const selectedColor = 'blue'
const defaultColor = 'lightgray'

export default function PointCounter (props) {

    return (
        <div className='text-center '>
            <TriangleFill size={fontSize} fill='darkgray'/>
            <span style={{fontSize: 22}}>48+</span>
            <TriangleFill size={fontSize} fill='darkgray' className='rotate-180'/>
        </div>
    )
}

