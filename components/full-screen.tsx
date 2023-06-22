'use client'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fscreen from 'fscreen'
export default function FullScreen() {

    const [fullScreenEnabled, setFullScreenEnabled] = useState(false)

    function goFullScreen() {
        const elem = document.getElementsByTagName("html")[0];
        if (fscreen.fullscreenEnabled) {
            fscreen.requestFullscreen(elem)
            toast.success('جهت خروج از حالت تمام صفحه، دکمه بازگشت یا esc را بزنید')
        }
    }

    useEffect(() => {
        fscreen.onfullscreenchange = () => {
            setFullScreenEnabled(document.fullscreenElement ? true : false)
        }
    }, [])



    if (fullScreenEnabled)
        return null

    return (
        <button className="text-xs" onClick={goFullScreen}>
            تمام صفحه
        </button>
    )
}