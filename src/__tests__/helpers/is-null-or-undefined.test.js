import {
  isNullOrUndefined,
  isNull,
  isUndefined,
  isNullOrUndefinedOrEmpty,
  isNullOrUndefinedOrFalse,
  isNotEmpty,
  doubleBang,
  isNotNullOrUndefined,
  isNotNullOrUndefinedOrEmpty,
  isNotNullOrUndefinedOrFalse,
} from 'utils/helpers/is-null-or-undefined'

describe('Is Null', () => {
  it('Should return true if the value being passed is null, otherwise should return false', () => {
    const func = isNull

    expect(func(null)).toBeTruthy()
    expect(func(undefined)).toBeFalsy()
    expect(func('value')).toBeFalsy()
    expect(func(1)).toBeFalsy()
    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(['value'])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func('')).toBeFalsy()
  })
})

describe('Is Undefined', () => {
  it('Should return true if the value being passed is undefined, otherwise should return false', () => {
    const func = isUndefined

    expect(func(null)).toBeFalsy()
    expect(func(undefined)).toBeTruthy()
    expect(func('value')).toBeFalsy()
    expect(func(1)).toBeFalsy()
    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(['value'])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func('')).toBeFalsy()
  })
})

describe('Is Null Or Undefined', () => {
  it('Should return true if the value being passed is null, or undefined, otherwise should return false', () => {
    const func = isNullOrUndefined

    expect(func(null)).toBeTruthy()
    expect(func(undefined)).toBeTruthy()
    expect(func('value')).toBeFalsy()
    expect(func(1)).toBeFalsy()
    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(['value'])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func('')).toBeFalsy()
  })
})

describe('Is Null Or Undefined Or Empty', () => {
  it('Should return true if the value being passed is null, undefined or empty, otherwise should return false', () => {
    const func = isNullOrUndefinedOrEmpty

    expect(func(null)).toBeTruthy()
    expect(func(undefined)).toBeTruthy()
    expect(func('value')).toBeFalsy()
    expect(func(1)).toBeFalsy()
    expect(func([])).toBeTruthy()
    expect(func({})).toBeTruthy()
    expect(func(['value'])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func(false)).toBeFalsy()
    expect(func(true)).toBeFalsy()
    expect(func('')).toBeTruthy()
  })
})

describe('Is Null Or Undefined Or False', () => {
  it('Should return true if the value being passed is null, undefined or false (including empty string), otherwise should return false', () => {
    const func = isNullOrUndefinedOrFalse

    expect(func(null)).toBeTruthy()
    expect(func(undefined)).toBeTruthy()
    expect(func('value')).toBeFalsy()
    expect(func(1)).toBeFalsy()
    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(['value'])).toBeFalsy()
    expect(func({ key: 'value' })).toBeFalsy()
    expect(func(false)).toBeTruthy()
    expect(func(true)).toBeFalsy()
    expect(func('')).toBeTruthy()
  })
})

describe('Is Not Empty', () => {
  it('Should return true if the value being passed is an non-empty object, array or string, otherwise should return false', () => {
    const func = isNotEmpty

    expect(func(null)).toBeTruthy()
    expect(func(undefined)).toBeTruthy()
    expect(func('value')).toBeTruthy()
    expect(func(1)).toBeTruthy()
    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(['value'])).toBeTruthy()
    expect(func({ key: 'value' })).toBeTruthy()
    expect(func(false)).toBeTruthy()
    expect(func(true)).toBeTruthy()
    expect(func('')).toBeFalsy()
  })
})

describe('Double Bang', () => {
  it('Should return true if passed a non-falsy value, otherwise should return false', () => {
    const func = doubleBang

    expect(func(null)).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func('value')).toBeTruthy()
    expect(func(1)).toBeTruthy()
    expect(func([])).toBeTruthy()
    expect(func({})).toBeTruthy()
    expect(func(['value'])).toBeTruthy()
    expect(func({ key: 'value' })).toBeTruthy()
    expect(func(false)).toBeFalsy()
    expect(func(true)).toBeTruthy()
    expect(func('')).toBeFalsy()
  })
})

describe('Is Not Null or Undefined', () => {
  it('Should return true if given a non-null or non-undefined value', () => {
    const func = isNotNullOrUndefined

    expect(func(null)).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func('value')).toBeTruthy()
    expect(func(1)).toBeTruthy()
    expect(func([])).toBeTruthy()
    expect(func({})).toBeTruthy()
    expect(func(['value'])).toBeTruthy()
    expect(func({ key: 'value' })).toBeTruthy()
    expect(func(false)).toBeTruthy()
    expect(func(true)).toBeTruthy()
    expect(func('')).toBeTruthy()
  })
})

describe('Is Not Null Or Undefined Or Empty', () => {
  it('Should return true if the value being passed is non-null, non-undefined or non-empty, otherwise should return false', () => {
    const func = isNotNullOrUndefinedOrEmpty

    expect(func(null)).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func('value')).toBeTruthy()
    expect(func(1)).toBeTruthy()
    expect(func([])).toBeFalsy()
    expect(func({})).toBeFalsy()
    expect(func(['value'])).toBeTruthy()
    expect(func({ key: 'value' })).toBeTruthy()
    expect(func(false)).toBeTruthy()
    expect(func(true)).toBeTruthy()
    expect(func('')).toBeFalsy()
  })
})

describe('Is Not Null Or Undefined Or False', () => {
  it('Should return true if the value being passed is non-null, non-undefined or non-false, otherwise should return false', () => {
    const func = isNotNullOrUndefinedOrFalse

    expect(func(null)).toBeFalsy()
    expect(func(undefined)).toBeFalsy()
    expect(func('value')).toBeTruthy()
    expect(func(1)).toBeTruthy()
    expect(func([])).toBeTruthy()
    expect(func({})).toBeTruthy()
    expect(func(['value'])).toBeTruthy()
    expect(func({ key: 'value' })).toBeTruthy()
    expect(func(false)).toBeFalsy()
    expect(func(true)).toBeTruthy()
    expect(func('')).toBeFalsy()
  })
})
