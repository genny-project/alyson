import { createContext, useContext, useReducer } from 'react'

import { ACTIONS } from 'utils/contexts/action'

const initialState = {
  text: null,
  email: null,
  phone: null,
}

const errorReducer = (errorState, action) => {
  switch (action.type) {
    case ACTIONS.SET_TO_TRUE:
      return { ...errorState, [action.payload]: true }
    case ACTIONS.SET_TO_FALSE:
      return { ...errorState, [action.payload]: false }
    default:
      return errorState
  }
}

const ErrorContext = createContext()

const ErrorContextProvider = ({ children }) => {
  const [errorState, dispatch] = useReducer(errorReducer, initialState)

  const value = { errorState, dispatch }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export default ErrorContextProvider

export const useError = () => useContext(ErrorContext)
