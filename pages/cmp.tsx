import Button from "@/components/Button";
import SelectAvatar from "@/components/profile/SelectAvatar";
import axios from "axios";
import { ReactNode, useState } from "react";
import cn from 'classnames'

export function Page ({children, extraClasses}: { children: ReactNode, extraClasses?: string}) {
    let className = 'flex flex-col justify-between h-full'
    if(extraClasses)
        className = cn(className, extraClasses)
    return (
        <main className={className}>
            {children}
        </main>
    )
}

export function Header ({children}: { children: ReactNode}) {
    return (
        <header className="p-3 border-b">
            {children}
        </header>
    )
}

export function Footer ({children}: { children: ReactNode}) {
    return (
        <footer className="p-2 border-t">
            {children}
        </footer>
    )
}

export function Content ({children}: { children: ReactNode}) {
    return (
        <div className="h-full px-4" style={{overflow: 'scroll'}}>
            {children}
        </div>
    )
}

export default function Cmp () {
    return (
        <Page>
            <Header>header</Header>
            <Content>
                <h1 className="text-3xl">Title</h1>
                {/* <h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1><h1 className="text-3xl">Title</h1> */}
            </Content>
            <Footer>
                <Button extendClass="w-1/3">ذffخیره</Button>
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
























