import { createContext, useContext, useReducer } from 'react'
import { initialState, isFieldEmptyReducer } from 'utils/contexts/IsFieldEmptyReducer'

const IsFieldEmpty = createContext()

const IsFieldEmptyProvider = ({ children }) => {
  const [fieldState, dispatchFieldMessage] = useReducer(isFieldEmptyReducer, initialState)

  const value = { fieldState, dispatchFieldMessage }

  return <IsFieldEmpty.Provider value={value}>{children}</IsFieldEmpty.Provider>
}

export default IsFieldEmptyProvider

export const useIsFieldEmpty = () => useContext(IsFieldEmpty)
