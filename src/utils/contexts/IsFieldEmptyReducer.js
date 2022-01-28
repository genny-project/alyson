import { isEmpty } from 'ramda'

export const ACTIONS = {
  SET_TO_TRUE: 'setTrue',
  SET_TO_FALSE: 'setFalse',
}

export const initialState = {}

export const isFieldEmptyReducer = (fieldState, { type, payload }) => {
  const fieldValue = document.getElementById(payload)
  const value = fieldValue.value
  const isValueEmpty = isEmpty(value)
  console.log('%c INFO ------>', 'color: blue; font-size: 20px', isValueEmpty)
  if (isValueEmpty) return { ...fieldState, [payload]: true }

  return fieldState
}
