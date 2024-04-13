import { Inter } from 'next/font/google'
import './globals.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wives GPT',
  description: 'Wives GPT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <div className="flex w-screen h-screen">
          <div className="w-[20%] overflow-hidden">
            <Sidebar />
          </div>
          <div className="w-[80%] overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  )
}
