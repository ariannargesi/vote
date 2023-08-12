
import React from 'react'
import localFont from 'next/font/local'
import '../styles/globals.css'
import { LayoutProps } from '@/.next/types/app/layout'
import { getServerSession } from 'next-auth'
import authOption from '@/pages/api/auth/[...nextauth]'
import Provider from './SessionProvider'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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

export default async function RootLayout(props: LayoutProps) {

  const session = await getServerSession(authOption)


  return (
    <html lang="en">
      <body className={iranYekan.className}>
        <Provider session={session}>        
          {props.children}
        </Provider>
      </body>      
    </html>
  )
}
