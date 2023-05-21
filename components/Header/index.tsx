import { ReactNode } from "react"

export default function Header (props: {
    start?: ReactNode,
    end?: ReactNode
}) {
    return (
        <header className="flex justify-between items-center h-12 px-4">
            {props.start}
            {props.end}
        </header>
    )
}

export function HeaderTitle (props: {
    children: ReactNode
}) {
    return (
        <h1 className="text-xl font-bold">
            {props.children}
        </h1>
    )
}