import { ReactNode } from "react";

export function Content ({children}: {children: ReactNode}) {
    return (
        <div className="h-full overflow-scroll relative p-2">
            {children}
        </div>
    )
}