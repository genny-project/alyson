import { createContext, useContext, useReducer } from 'react'
import { initialState, isFiledNotEmptyReducer } from 'utils/contexts/IsFieldNotEmptyReducer'

const IsFieldNotEmpty = createContext()

const IsFieldNotEmptyProvider = ({ children }) => {
  const [fieldState, dispatchFieldMessage] = useReducer(isFiledNotEmptyReducer, initialState)

  const value = { fieldState, dispatchFieldMessage }

  return <IsFieldNotEmpty.Provider value={value}>{children}</IsFieldNotEmpty.Provider>
}

export default IsFieldNotEmptyProvider

export const useIsFieldNotEmpty = () => useContext(IsFieldNotEmpty)
