import { createContext, useContext, useState, useEffect } from 'react'

import { getChatsByUser } from '../services/ChatService'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [allPrompts, setAllPrompts] = useState([])
  const [publicAllPrompts, setPublicAllPrompts] = useState([])
  const isLoggedIn = Boolean(localStorage.getItem('user'))
  const user = JSON.parse(localStorage.getItem('user'))

  /* Get all chats from DB per user */
  useEffect(() => {
    const _getChatsByUser = async () => {
      const response = await getChatsByUser(user.userID)
      // console.log('response:', response)
    }

    if (isLoggedIn) _getChatsByUser()
  }, [])

  return (
    <AppContext.Provider
      value={{
        allPrompts,
        setAllPrompts,
        isLoggedIn,
        publicAllPrompts,
        setPublicAllPrompts,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
