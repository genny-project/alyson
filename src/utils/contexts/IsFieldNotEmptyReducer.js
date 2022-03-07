import { isEmpty } from 'ramda'

export const ACTIONS = {
  SET_TO_TRUE: 'setTrue',
  SET_TO_FALSE: 'setFalse',
}

export const initialState = {}

export const isFiledNotEmptyReducer = (fieldState, { payload }) => {
  let isValueEmpty
  const fieldValue = document.getElementById(payload)
  const value = fieldValue?.value
  isValueEmpty = value ? isEmpty(value) : true

  if (isValueEmpty) {
    return { ...fieldState, [payload]: false }
  } else if (!isValueEmpty) return { ...fieldState, [payload]: true }

  return fieldState
}
