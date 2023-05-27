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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
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
    
  return (
    <SessionProvider session={pageProps.session}>
      <main style={{ direction: 'rtl' }} className={cn(iranYekan.className, 'h-full')}>
        <div className='h-full'>
          <Component {...pageProps} />
        </div>
        <ToastContainer 
          position='bottom-center'
          rtl
        />
      </main>
      
    </SessionProvider>
  )
}
