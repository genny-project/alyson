import { useState, createContext, useContext } from 'react'

const ErrorContext = createContext()

export const useError = () => useContext(ErrorContext)

const ErrorContextProvider = ({ children }) => {
  const [error, setError] = useState(false)

  const value = { error, setError }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export default ErrorContextProvider
