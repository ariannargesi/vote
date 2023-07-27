import { ReactNode } from "react";

export default function Footer ({children}: {children: ReactNode}) {
    return (
        <footer className="p-2 border-t">
            {children}
        </footer>
    )
}