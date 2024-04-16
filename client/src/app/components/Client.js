'use client'

import { useState } from 'react'
import { AppWrapper } from '../context'
import { usePathname } from 'next/navigation'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'

const AUTH_PAGES = ['/login', '/signup']

const Client = ({ children }) => {
  const [open, setOpen] = useState(true)
  const [prompt, setPrompt] = useState('')
  const pathname = usePathname()

  return (
    <AppWrapper>
      {AUTH_PAGES.includes(pathname) ? (
        <div>{children}</div>
      ) : (
        <div className="flex w-screen h-screen">
          <div
            className={`${
              open ? 'w-[90%] sm:w-[40%] lg:w-[30%] xl:w-[20%]' : 'w-20'
            }   bg-[#F9F9F9] duration-300 overflow-hidden`}
          >
            <Sidebar open={open} setOpen={setOpen} />
          </div>
          <div
            className={`${
              open
                ? 'hidden sm:flex sm:flex-col sm:w-full md:w-2/3'
                : 'w-[80%] overflow-hidden'
            } p-6`}
          >
            <div>
              <Navbar />
            </div>
            <div>{children}</div>
            <div
              className={`${
                open ? 'w-[75%]' : 'w-[70%] md:w-[80%] lg:w-[90%]'
              } flex justify-center fixed bottom-5`}
            >
              <ChatBox prompt={prompt} setPrompt={setPrompt} />
            </div>
          </div>
        </div>
      )}
    </AppWrapper>
  )
}

export default Client
