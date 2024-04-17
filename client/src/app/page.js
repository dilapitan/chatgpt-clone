'use client'

import { useRef, useEffect } from 'react'
import { useAppContext } from './context'

import WivesGPTLogo from './components/WivesGPTLogo'

export default function Home() {
  const chatListRef = useRef()
  const { isLoggedIn, publicAllPrompts } = useAppContext()

  useEffect(() => {
    chatListRef.current?.lastElementChild?.scrollIntoView()
  }, [publicAllPrompts])

  return (
    <main>
      <div className="mt-5">
        {publicAllPrompts.length && !isLoggedIn ? (
          <div
            ref={chatListRef}
            className="flex flex-col space-y-10 h-[475px] md:h-[750px] lg:h-[900px] xl:h-[475px] overflow-y-scroll w-full p-2 sm:p-10"
          >
            {publicAllPrompts.map((prompt, index) => {
              return (
                <div key={index} className="flex space-x-2">
                  <div>
                    {prompt.role === 'user' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    ) : (
                      <WivesGPTLogo color={'text-blue-500'} />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold">
                      {prompt.role === 'user' ? (
                        'You'
                      ) : (
                        <p className="text-blue-500">Wives GPT</p>
                      )}
                    </h2>
                    <p className="text-md">{prompt.parts[0].text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl">How can I help you today?</h1>
          </div>
        )}
      </div>
    </main>
  )
}
