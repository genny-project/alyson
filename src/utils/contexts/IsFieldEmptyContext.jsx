import { createContext, useContext, useReducer } from 'react'
import { initialState, isFieldEmptyReducer } from 'srutils/contexts/IsFieldEmptyReducer'

const IsFieldEmpty = createContext()

const IsFieldEmptyProvider = ({ children }) => {
  const [fieldState, dispatch] = useReducer(isFieldEmptyReducer, initialState)

  const value = { fieldState, dispatch }

  return <IsFieldEmpty.Provider value={value}>{children}</IsFieldEmpty.Provider>
}

export default IsFieldEmptyProvider

export const useIsFieldEmpty = () => useContext(IsFieldEmpty)
