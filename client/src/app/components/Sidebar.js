'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLogo from '../components/UserLogo'
import WivesGPTLogo from '../components/WivesGPTLogo'
import { useAppContext } from '../context'

const Sidebar = ({ open, setOpen }) => {
  const { isLoggedIn, allPrompts, setAllPrompts } = useAppContext()
  const router = useRouter()
  const user = localStorage.getItem('user')

  const handleLogout = () => {
    setAllPrompts([])
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="p-5">
      <div className="text-right">
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <div>
        <button className="w-full bg-blue-500 rounded-md p-2 font-bold text-white">
          {open ? (
            <Link href="/">
              <div className="flex items-center">
                <WivesGPTLogo color={'text-white'} />

                <span className="ml-2 text-lg md:text-sm mr-36 md:mr-28">
                  New Chat
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 md:w-4 md:h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </Link>
          ) : (
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          )}
        </button>
      </div>

      {open && (
        <div className="mt-5 h-[500px] sm:h-[700px] md:h-[730px] lg:h-[1000px] xl:h-[430px] overflow-auto p-2">
          <ul>
            {allPrompts.length ? (
              <div className="flex flex-col space-y-5">
                {allPrompts.map((prompt) => {
                  return (
                    <Link key={prompt._chatID} href={prompt._chatID}>
                      <li className="p-2 text-sm hover:bg-gray-200 rounded-md truncate">
                        {prompt.chatPrompt}
                      </li>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
      )}

      {open && (
        <div className="flex flex-col space-y-2 items-center justify-center w-full mt-5">
          {isLoggedIn ? (
            <div className="w-full flex flex-col items-center space-y-2">
              <div className="flex justify-center items-center space-x-2">
                <UserLogo />
                <div className="truncate">{user}</div>
              </div>

              <button
                onClick={handleLogout}
                className="border-[1px] text-blue-500 border-blue-500 w-full rounded-md p-2 font-bold font-blue-500 hover:bg-blue-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <div className="w-full text-left">
                <p className="font-bold text-sm">Sign up or log in</p>
                <p className="text-xs text-gray-700">
                  Save your chat history, share chats, and personalize your
                  experience.
                </p>
              </div>

              <div className="mt-5 w-full flex flex-col space-y-2">
                <Link
                  href="/signup"
                  className="w-full text-center text-sm font-bold text-white bg-blue-500 py-2 rounded-lg hover:bg-blue-600"
                >
                  Sign Up
                </Link>

                <Link
                  href="/login"
                  className="w-full text-center border-[1px] border-blue-500 text-sm font-bold text-blue-500 bg-white py-2 rounded-lg hover:bg-blue-100"
                >
                  {isLoggedIn ? 'Logout' : 'Log in'}
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Sidebar
