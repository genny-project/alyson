import { useReducer } from 'react'

import { ACTIONS } from 'utils/reducers/action.js'

const initialState = {
  text: false,
  email: false,
  phone: false,
}

const errorReducer = (errorState, action) => {
  console.log('actions', action)
  switch (action.type) {
    case ACTIONS.SET_TO_TRUE:
      return { ...errorState, [action.payload]: true }
    case ACTIONS.SET_TO_FALSE:
      return { ...errorState, [action.payload]: false }
    default:
      return errorState
  }
}

const useErrorReducer = () => {
  const [errorState, dispatch] = useReducer(errorReducer, initialState)
  return { errorState, dispatch }
}

export default useErrorReducer
