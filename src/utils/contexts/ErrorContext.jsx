import { useState, createContext, useContext } from 'react'

const ErrorContext = createContext()

export const useError = () => useContext(ErrorContext)

const ErrorContextProvider = ({ children }) => {
  const [textError, setTextError] = useState(false)
  const [error, setError] = useState({
    text: false,
    phone: false,
    email: false,
  })

  const value = { error, setError, textError, setTextError }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export default ErrorContextProvider
