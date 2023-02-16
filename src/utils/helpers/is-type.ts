import { compose, is, not } from 'ramda'

export const isBoolean = is(Boolean)
export const isNumber = is(Number)
export const isString = is(String)
export const isObject = is(Object)
export const isArray = is(Array)
export const isFunction = is(Function)

export const isNotBoolean = compose(not, isBoolean)
export const isNotNumber = compose(not, isNumber)
export const isNotString = compose(not, isString)
export const isNotObject = compose(not, isObject)
export const isNotArray = compose(not, isArray)
export const isNotFunction = compose(not, isFunction)
