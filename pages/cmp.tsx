import Button from "@/features/Button";
import SelectAvatar from "@/features/profile/SelectAvatar";
import axios from "axios";
import { ReactNode, useState } from "react";

export function Page ({children}: { children: ReactNode}) {
    return (
        <main className="flex flex-col justify-between h-full">
            {children}
        </main>
    )
}

export function Header ({children}: { children: ReactNode}) {
    return (
        <header>
            {children}
        </header>
    )
}

export function Footer ({children}: { children: ReactNode}) {
    return (
        <footer className="pb-1">
            {children}
        </footer>
    )
}

export function Content ({children}: { children: ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}

export default function Cmp () {
    return (
        <Page>
            <Header>header</Header>
            <Content>Content</Content>
            <Footer>
                <Button>ذخیره</Button>
            </Footer>
        </Page>
    )
}



















export function Traning (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSend () {
        setLoading(true)
        axios.post('https://google.com/new-user', {username, password})
        .then(response => {
            // everything is okay 
            // do that thing
        })
        .catch(() => {
            // for error case 
        })        
        .finally(() => {
            // runs, no matter what 
            setLoading(false)
        })
    }

    return (
        <div>
            <input type="text" value={username} onChange={event => setUsername(event.target.value)} />        
            <input type="text" value={password} onChange={event => setPassword(event.target.value)} />        
            <button onClick={handleSend}>Send</button>
        </div>
    )
}
























