import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [allPrompts, setAllPrompts] = useState([])

  return (
    <AppContext.Provider
      value={{
        allPrompts,
        setAllPrompts,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
