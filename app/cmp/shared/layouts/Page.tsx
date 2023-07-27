import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

export default function Page ({children}: {children: ReactNode}) {
    let className = 'flex flex-col justify-between h-full max-w-3xl mx-auto'
    return (
        <main className={className}>
            {children}
            <ToastContainer/>
        </main>
    )
}
