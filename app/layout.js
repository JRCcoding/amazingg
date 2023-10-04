import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Amazing G | Gloria  G. Apolinario | Verified Alibaba Distributor',
  description:
    'Amazing G is more than a store for us. It is more than an online shop, it is more than a company. Amazing G is a gathering of those who want to help others. We strive to be able to help those who want to make something of themselves.',
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
