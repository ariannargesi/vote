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
const iranYekan = localFont({
  src: [
    {
      path: '../assets/fonts/IRANYekanX-Regular.woff2',
      style: 'normal',
      weight: '400'
    },
    {
      path: '../assets/fonts/IRANYekanX-Bold.woff2',
      style: 'bold',
      weight: '700'
    }
  ]
})

export default function App({ Component, pageProps }: AppProps) {
    
  return (
    <SessionProvider session={pageProps.session}>
      <main style={{ direction: 'rtl' }} className={cn(iranYekan.className, 'h-full flex flex-col max-w-3xl mx-auto ')}>
        <div className='h-full overflow-y-scroll '>
          <Component {...pageProps} />
        </div>
        <Footer/>
      </main>
      
    </SessionProvider>
  )
}
