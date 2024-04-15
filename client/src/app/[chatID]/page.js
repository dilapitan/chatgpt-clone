'use client'

import { useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppContext } from '../context'

import UserLogo from '../components/UserLogo'
import WivesGPTLogo from '../components/WivesGPTLogo'

const ChatPage = () => {
  const chatListRef = useRef()
  const { chatID } = useParams()
  const { allPrompts } = useAppContext()
  console.log('allPrompts:', allPrompts)

  const currentChat = allPrompts.find((prompt) => prompt._chatID === chatID)
  console.log('currentChat in ChatID:', currentChat)

  useEffect(() => {
    chatListRef.current?.lastElementChild?.scrollIntoView()
  }, [currentChat?.chatAllPrompt])

  return (
    <div className="mt-5">
      {currentChat?.chatAllPrompt?.length ? (
        <div
          ref={chatListRef}
          className="flex flex-col space-y-10 h-[475px] md:h-[750px] lg:h-[900px] xl:h-[475px] overflow-y-scroll w-full p-2 sm:p-10"
        >
          {currentChat?.chatAllPrompt?.map((prompt, index) => {
            return (
              <div key={index} className="flex space-x-2">
                <div>
                  {prompt.role === 'user' ? (
                    <UserLogo />
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
        <div></div>
      )}
    </div>
  )
}

export default ChatPage
