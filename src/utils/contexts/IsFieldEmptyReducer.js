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
  console.log('%c REDUCER ------>', 'color: tomato; font-size: 20px', { isValueEmpty, payload })
  if (isValueEmpty) {
    console.log('%c one ------>', 'color: green; font-size: 20px', { isValueEmpty, payload })

    return { ...fieldState, [payload]: true }
  } else if (!isValueEmpty) return { ...fieldState, [payload]: false }

  return fieldState
}
