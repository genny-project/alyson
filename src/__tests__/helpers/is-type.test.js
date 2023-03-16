import { is } from 'ramda'
import {
  isArray,
  isObject,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isDate,
  isRegExp,
} from 'utils/helpers/is-type'

describe('Is Array', () => {
  it('Should return true if passed an Array, or false otherwise', () => {
    const func = isArray

    expect(func([])).toBeTruthy()
    expect(func({})).toBeFalsy()
    expect(func(0)).toBeFalsy()
    expect(func('value')).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeTruthy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func('')).toBeFalsy()
    expect(func('true')).toBeFalsy()
    expect(func('false')).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(() => {})).toBeFalsy()
    expect(func(is)).toBeFalsy()
    expect(func(new Date())).toBeFalsy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeFalsy()
  })
})

describe('Is Object', () => {
  it('Should return true if passed a Object, or false otherwise', () => {
    const func = isObject

    expect(func([])).toBeTruthy()
    expect(func({})).toBeTruthy()
    expect(func(0)).toBeFalsy()
    expect(func('value')).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeTruthy()
    expect(func({ key: 'value' })).toBeTruthy()
    expect(func('')).toBeFalsy()
    expect(func('true')).toBeFalsy()
    expect(func('false')).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(() => {})).toBeTruthy()
    expect(func(is)).toBeTruthy()
    expect(func(new Date())).toBeFalsy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeFalsy()
  })
})

describe('Is String', () => {
  it('Should return true if passed a String, or false otherwise', () => {
    const func = isString

    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(0)).toBeFalsy()
    expect(func('value')).toBeTruthy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func('')).toBeTruthy()
    expect(func('true')).toBeTruthy()
    expect(func('false')).toBeTruthy()
    expect(func(true)).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(() => {})).toBeFalsy()
    expect(func(is)).toBeFalsy()
    expect(func(new Date())).toBeFalsy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeFalsy()
  })
})

describe('Is Number', () => {
  it('Should return true if passed a Number, or false otherwise', () => {
    const func = isNumber

    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(0)).toBeTruthy()
    expect(func('value')).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func('')).toBeFalsy()
    expect(func('true')).toBeFalsy()
    expect(func('false')).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(() => {})).toBeFalsy()
    expect(func(is)).toBeFalsy()
    expect(func(new Date())).toBeFalsy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeFalsy()
  })
})

describe('Is Boolean', () => {
  it('Should return true if passed a Boolean, or false otherwise', () => {
    const func = isBoolean

    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(0)).toBeFalsy()
    expect(func('value')).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func('')).toBeFalsy()
    expect(func('true')).toBeFalsy()
    expect(func('false')).toBeFalsy()
    expect(func(true)).toBeTruthy()
    expect(func(false)).toBeTruthy()
    expect(func(() => {})).toBeFalsy()
    expect(func(is)).toBeFalsy()
    expect(func(new Date())).toBeFalsy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeFalsy()
  })
})

describe('Is Function', () => {
  it('Should return true if passed a Function, or false otherwise', () => {
    const func = isFunction

    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(0)).toBeFalsy()
    expect(func('value')).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func('')).toBeFalsy()
    expect(func('true')).toBeFalsy()
    expect(func('false')).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(() => {})).toBeTruthy()
    expect(func(is)).toBeTruthy()
    expect(func(new Date())).toBeFalsy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeFalsy()
  })
})

describe('Is Date', () => {
  it('Should return true if passed a Date, or false otherwise', () => {
    const func = isDate

    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(0)).toBeFalsy()
    expect(func('value')).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func('')).toBeFalsy()
    expect(func('true')).toBeFalsy()
    expect(func('false')).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(() => {})).toBeFalsy()
    expect(func(is)).toBeFalsy()
    expect(func(new Date())).toBeTruthy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeFalsy()
  })
})

describe('Is RegExp', () => {
  it('Should return true if passed a Regular Expression, or false otherwise', () => {
    const func = isRegExp

    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(0)).toBeFalsy()
    expect(func('value')).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func(null)).toBeFalsy()
    expect(func([''])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func('')).toBeFalsy()
    expect(func('true')).toBeFalsy()
    expect(func('false')).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(() => {})).toBeFalsy()
    expect(func(is)).toBeFalsy()
    expect(func(new Date())).toBeFalsy()
    expect(
      func(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
    ).toBeTruthy()
  })
})
