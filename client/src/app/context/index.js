import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [allPrompts, setAllPrompts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <AppContext.Provider
      value={{
        allPrompts,
        setAllPrompts,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
