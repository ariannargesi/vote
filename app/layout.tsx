
import localFont from 'next/font/local'
import '../styles/globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={iranYekan.className}>
          {children}
      </body>      
    </html>
  )
}
