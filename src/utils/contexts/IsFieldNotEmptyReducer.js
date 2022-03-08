import { isEmpty, equals } from 'ramda'

export const ACTIONS = {
  SET_TO_TRUE: 'setTrue',
  SET_TO_FALSE: 'setFalse',
}

export const initialState = {}

export const isFiledNotEmptyReducer = (fieldState, { payload }) => {
  const fieldValue = document.getElementById(payload)
  const value = fieldValue?.value
  const isValueEmpty = isEmpty(value)
  const isValueUndefined = equals(undefined)(value)

  if (isValueEmpty || isValueUndefined) {
    return { ...fieldState, [payload]: false }
  }

  return fieldState
}
