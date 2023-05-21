import { ChangeEvent, useRef, useState } from "react"
import Button from "../Button"
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { setServers } from "dns"
import Modal from "@/components/Modal"
import axios from "axios"

export default function SelectAvatar() {

    const [modal, setModal] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const [crop, setCrop] = useState<Crop>({ unit: "%", height: 40, width: 40, x: 40, y: 40 })
    const [src, setSrc] = useState('')
    const [file, setFile] = useState<File | null>()

    function handleClick() {
        inputRef.current!.click()
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setFile(event.target.files[0])
                setSrc(reader.result?.toString() || '')
                
                setModal(true)
            })
            reader.readAsDataURL(event.target.files[0])
        }
    }

    async function handleConfirm() {
        const endpoint = "/api/save-avatar"
        const body = {
            crop,
            file
        }
        try {
            const response = await axios.post(endpoint, body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
           
        }catch(error){
          console.log('error')  
        }
        

    }

    function handleCancel(): void {

    }

    return (
        <div className="flex flex-col items-center">
            <input type="file" hidden ref={inputRef} accept="png" onChange={handleChange} />
            <Button color="info" onClick={handleClick}>انتخاب عکس</Button>

            <Modal
                visibility={!!src}
                footer={(
                    <>
                        <Button color="success" full onClick={handleConfirm}>تایید</Button>
                        <Button color="danger" outline onClick={handleCancel}>انصراف</Button>
                    </>
                )}
                content={
                    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                        <ReactCrop
                            className="rounded"
                            crop={crop}
                            onChange={c => setCrop(c)}
                            circularCrop
                            aspect={1}
                        >
                            <img src={src} className="w-full block" />
                        </ReactCrop>
                    </div>
                }
            />
        </div>
    )
}