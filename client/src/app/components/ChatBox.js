'use client'

import { useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAppContext } from '../context'

import { v4 as uuidv4 } from 'uuid'

import chatToGoogleGemini from '../services/GoogleGeminiServices'

const ChatBox = ({ prompt, setPrompt }) => {
  const textAreaRef = useRef()
  const router = useRouter()
  const { chatID } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))

  const {
    isLoggedIn,
    allPrompts,
    setAllPrompts,
    publicAllPrompts,
    setPublicAllPrompts,
  } = useAppContext()
  const [isSending, setIsSending] = useState(false)

  const handleKeyPress = (event) => {
    setPrompt(event.target.value)

    updateTextAreaHeight(event.target)

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      getResultsFromGoogleGemini()

      event.target.style.height = 'auto'
      setPrompt('')
    }
  }

  const updateTextAreaHeight = (textArea) => {
    textArea.style.height = 'auto'
    textArea.style.height = textArea.scrollHeight + 'px'
  }

  const callApi = () => {
    getResultsFromGoogleGemini()

    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.focus()

    setPrompt('')
  }

  const getResultsFromGoogleGemini = async () => {
    setIsSending(true)

    if (isLoggedIn) {
      const currentChat = allPrompts.find((prompt) => prompt._chatID === chatID)

      const chat = {
        _chatID: currentChat ? currentChat._chatID : uuidv4(),
        chatPrompt: prompt,
        chatAllPrompt: currentChat ? currentChat.chatAllPrompt : [],
        user_id: user.userID,
      }

      // allPrompts is of a single Chat Thread
      const responseMessage = await chatToGoogleGemini(
        chat.chatAllPrompt,
        prompt,
      )
      const newChatAllPrompts = [
        ...chat.chatAllPrompt,
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: responseMessage,
            },
          ],
        },
      ]

      // One Chat Thread
      // Old: setAllPrompts(newAllPrompts)

      // Update newly created Chat Object with the 'newAllPrompts'
      chat['chatAllPrompt'] = newChatAllPrompts

      const newAllPrompts = [...allPrompts]

      if (chatID === undefined) {
        newAllPrompts.push(chat)
      } else {
        newAllPrompts.forEach((item) => {
          if (item._chatID === chat._chatID) {
            item['chatAllPrompt'] = chat['chatAllPrompt']
            return
          }
        })
      }

      // ChatService for storing `newAllPrompts` to DB
      setAllPrompts(newAllPrompts)

      // Then pushed it to the global array of Chat Threads under the logged in user

      if (isLoggedIn && chatID === undefined) {
        router.push(`/${chat._chatID}`)
      }
    } else {
      const responseMessage = await chatToGoogleGemini(publicAllPrompts, prompt)
      const newChatAllPrompts = [
        ...publicAllPrompts,
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: responseMessage,
            },
          ],
        },
      ]

      setPublicAllPrompts(newChatAllPrompts)
    }

    setIsSending(false)
  }

  return (
    <div className="mx-2 sm:mx-10 md:mx-20 lg:mx-2">
      <div className="flex space-x-2 items-center">
        <textarea
          ref={textAreaRef}
          className="rounded-md max-h-[200px] w-full p-4 resize-none border-[1px] border-gray-500 outline-none focus:border-blue-500 focus:border-2"
          value={prompt}
          onChange={handleKeyPress}
          onKeyDown={handleKeyPress}
          placeholder="Message Wives GPT..."
          rows={1}
        />
        {isSending ? (
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <button
            className="focus:border-2 focus:border-blue-500"
            onClick={callApi}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${
                prompt.length ? 'text-blue-500 cursor-pointer' : 'text-gray-400'
              }  w-10 h-10`}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Wives GPT can make mistakes. Consider checking important information.
      </p>
    </div>
  )
}

export default ChatBox
