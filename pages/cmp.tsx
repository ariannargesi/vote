import Button from "@/components/Button";
import SelectAvatar from "@/components/profile/SelectAvatar";
import axios from "axios";
import { ReactNode, useState } from "react";
import cn from 'classnames'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
type Props = { children: ReactNode, extraClasses?: string }

export function Page ({children, extraClasses}: Props) {
    let className = 'flex flex-col justify-between h-full max-w-3xl mx-auto'
    if(extraClasses)
        className = cn(className, extraClasses)
    return (
        <main className={className}>
            {children}
            <ToastContainer/>
        </main>
    )
}

export function Header ({children, extraClasses}: Props) {
    let className = "p-3 border-b"
    if(extraClasses)
        className = cn(className, extraClasses)
    return (
        <header className={className}>
            {children}
        </header>
    )
}

export function Footer ({children}: Props) {
    return (
        <footer className="p-2 border-t">
            {children}
        </footer>
    )
}

export function Content ({children}: Props) {
    return (
        <div className="h-full p-4 overflow-scroll relative">
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



















export function Traning () {
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
























