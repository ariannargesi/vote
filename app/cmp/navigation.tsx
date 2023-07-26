import Button from '@/components/Button'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import Link from 'next/link'
import { PlusCircle, House, Person } from 'react-bootstrap-icons'
import FontAwesome from 'react-fontawesome'
export default function Footer() {
    const isLoggedIn = useIsLoggedIn()
    return (
        <div className='p-2 px-6 border-t h-12'>
            {isLoggedIn ?
                <div className='text-3xl flex justify-between w-full'>
                    <Link href={'/profile'}>
                    </Link>
                    <Link href={'/new-vote'}>
                        <PlusCircle />
                    </Link>
                    <Link href={'/'}  className='text-blue-400' >
                        <House />
                    </Link>rom 'react-fontawesome'
                </div>
                :
                <Link href={'/api/auth/signin'} className='w-full'>
                    <Button color='default' full>ورود</Button>
                </Link>
            }
        </div>
    )
}