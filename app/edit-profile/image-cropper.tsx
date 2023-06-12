import { ReactNode, useRef, MouseEvent } from "react"
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "@/components/Button";

export default function ImageCropper(props:
    { src: string, selectHandler: (imageURl: string) => void, closeHandler: () => void }) {

    const cropperRef = useRef<ReactCropperElement>(null);
    
    function cancelHandler(): void {
        props.closeHandler()
    }

    function selectHandler(): void {
        const cropper = cropperRef.current!.cropper;
        
        const dataURL = cropper.getCroppedCanvas().toDataURL()
        props.selectHandler(dataURL)
    }

    return (
        <div className="absolute left-0 top-0 bg-whtie/30 backdrop-blur-sm  w-full">
            <Cropper
                src={props.src}
                style={{ maxHeight: '70%'}}
                // Cropper.js options
                aspectRatio={1}
                viewMode={1}
                crop={(event) => {
                    console.log(cropperRef.current?.cropper.getImageData())
                }}
                background={false}
                ref={cropperRef}
            />
            <div className="flex items-center gap-x-4 justify-center">
                <Button color="danger" outline onClick={cancelHandler}>بیخیال</Button>
                <Button color="success" onClick={selectHandler}>همین خوبه!</Button>
            </div>
        </div>
    )
}