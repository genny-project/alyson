import { createContext, useContext, useReducer } from 'react'
import { initialState, errorReducer } from 'utils/contexts/ErrorReducer'

const ErrorContext = createContext()

const ErrorContextProvider = ({ children }) => {
  const [errorState, dispatch] = useReducer(errorReducer, initialState)

  const value = { errorState, dispatch }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export default ErrorContextProvider

export const useError = () => useContext(ErrorContext)
