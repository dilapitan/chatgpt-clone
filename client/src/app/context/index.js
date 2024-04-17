import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [allPrompts, setAllPrompts] = useState([])
  const [publicAllPrompts, setPublicAllPrompts] = useState([])
  const isLoggedIn = Boolean(localStorage.getItem('user'))

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
