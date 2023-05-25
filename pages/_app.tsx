import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import cn from 'classnames'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import Button from '@/features/Button'
import Path  from 'next/navigation'
import Footer from '@/components/footer'
import { useEffect } from 'react'
import { House, Person, Plus, PlusCircle } from 'react-bootstrap-icons'
import { useRouter } from 'next/router'
const iranYekan = localFont({
  src: [
    {
      path: '../public//assets/fonts/IRANYekanX-Regular.woff2',
      style: 'normal',
      weight: '400'
    },
    {
      path: '../public/assets/fonts/IRANYekanX-Bold.woff2',
      style: 'bold',
      weight: '700'
    }
  ]
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  


  return (
    <SessionProvider session={pageProps.session}>
      <main style={{ direction: 'rtl' }} className={cn(iranYekan.className, 'h-full')}>
        <div className='h-full flex flex-col justify-between'>
          <div className='content' style={{overflow: 'scroll'}}>
          <Component {...pageProps} /> 
          </div>
          <div className="footer text-3xl flex justify-between border px-4 py-3">
            <Person 
              onClick={() => router.push('/profile')}
              className={router.pathname === '/profile' ? 'text-blue-400' : undefined}
            />
            <PlusCircle 
              onClick={() => router.push('/create-poll')}
              className={router.pathname === '/create-poll' ? 'text-blue-400' : undefined}
            />
            <House 
              onClick={() => router.push('/')}
              className={router.pathname === '/' ? 'text-blue-400' : undefined}
            />
          </div>
        </div>
        
      </main>
      
    </SessionProvider>
  )
}
