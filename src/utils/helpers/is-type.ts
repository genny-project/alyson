import { is, compose, not } from 'ramda'

export const isArray = is(Array)
export const isObject = is(Object)
export const isString = is(String)
export const isNumber = is(Number)
export const isBoolean = is(Boolean)
export const isFunction = is(Function)
export const isDate = is(Date)
export const isRegExp = is(RegExp)

export const isNotArray = compose(not, isArray)
export const isNotObject = compose(not, isObject)
export const isNotString = compose(not, isString)
export const isNotNumber = compose(not, isNumber)
export const isNotBoolean = compose(not, isBoolean)
export const isNotFunction = compose(not, isFunction)
export const isNotDate = compose(not, isDate)
export const isNotRegExp = compose(not, isRegExp)
