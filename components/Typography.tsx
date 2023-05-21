export function Paraphgraph (props: {content: string} ) {
    return (
        <p className="mt-2">
           {props.content}
        </p>
    )
}

export function TitleLarge (props: {content: string}) {
    return (
        <h1 className="text-xl font-bold">
            {props.content}
        </h1>
    )
}

