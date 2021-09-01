export const ACTIONS = {
  SET_TO_TRUE: 'setTrue',
  SET_TO_FALSE: 'setFalse',
}

export const initialState = {
  text: null,
  email: null,
  phone: null,
}

export const errorReducer = (errorState, action) => {
  switch (action.type) {
    case ACTIONS.SET_TO_TRUE:
      return { ...errorState, [action.payload]: true }
    case ACTIONS.SET_TO_FALSE:
      return { ...errorState, [action.payload]: false }
    default:
      return errorState
  }
}
