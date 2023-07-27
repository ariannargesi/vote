import { ReactNode } from "react"

export default function Header ({title, end}: {title: string, end?: ReactNode}) {

    let className = "px-3 py-2 border-b border-black flex"
    
    return (
        <header className={className}>
            {title && <h1 className="text-center font-bold text-xl">{title}</h1> }
            {end && <div className="mr-auto">{end}</div>}
        </header>
    )
}