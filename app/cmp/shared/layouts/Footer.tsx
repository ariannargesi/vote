import { ReactNode } from "react";

export default function Footer ({children}: {children: ReactNode}) {
    return (
        <footer className="px-3 py-2 border-t border-black">
            {children}
        </footer>
    )
}