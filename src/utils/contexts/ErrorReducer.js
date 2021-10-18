export const ACTIONS = {
  SET_TO_TRUE: 'setTrue',
  SET_TO_FALSE: 'setFalse',
}

export const initialState = {}

export const errorReducer = (errorState, { type, payload }) => {
  if (!errorState[payload]) {
    errorState[payload] = false
  }

  if (type === ACTIONS.SET_TO_TRUE) {
    return { ...errorState, [payload]: true }
  }
  if (type === ACTIONS.SET_TO_FALSE) {
    return { ...errorState, [payload]: false }
  }

  return errorState
}
