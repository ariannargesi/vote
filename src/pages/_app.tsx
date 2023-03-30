import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import cn from 'classnames'
import { SessionProvider } from 'next-auth/react'
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
    <div style={{direction: 'rtl'}} className={cn(iranYekan.className, 'p-3 h-full')}><Component {...pageProps} /></div>
    </SessionProvider>
  )
}
