import {
  isTypeOf,
  maybeThisOrType,
  maybeThisOrObject,
  maybeThisOrString,
  arrayOrMakeArray,
  getPrefixFromCode,
  anyEquals,
} from 'utils/functionals'

describe('maybeThisOrString', () => {
  it('should return empty string if it is passed falsy', () => {
    expect(maybeThisOrString(null)).toEqual('')
    expect(maybeThisOrString(undefined)).toEqual('')
    expect(maybeThisOrString(false)).toEqual('')
  })

  it('should return what was passed if it is a string otherwise empty string', () => {
    expect(maybeThisOrString({})).toEqual('')
    expect(maybeThisOrString('{}')).toEqual('{}')
    expect(maybeThisOrString('Hello')).toEqual('Hello')
  })
})

describe('maybeThisOrObject', () => {
  it('should return empty object if it is passed falsy', () => {
    expect(maybeThisOrObject(null)).toEqual({})
    expect(maybeThisOrObject(undefined)).toEqual({})
    expect(maybeThisOrObject(false)).toEqual({})
  })

  it('should return what was passed if it is an object otherwise empty object', () => {
    expect(maybeThisOrObject({})).toEqual({})
    expect(maybeThisOrObject('{}')).toEqual({})
    expect(maybeThisOrObject('Hello')).toEqual({})
  })
})

describe('arrayOrMakeArray', () => {
  it('should return the array it was passed', () => {
    expect(arrayOrMakeArray(['hi'])).toEqual(['hi'])
    expect(arrayOrMakeArray([['hi']])).toEqual([['hi']])
  })
  it('should return an array of the thing it was passed if not an array', () => {
    expect(arrayOrMakeArray({})).toEqual([{}])
    expect(arrayOrMakeArray('hi')).toEqual(['hi'])
    expect(arrayOrMakeArray(null)).toEqual([null])
  })

  describe('getPrefixFromCode', () => {
    it('should return the prefix from whatever code was passed', () => {
      expect(getPrefixFromCode('FRM_TEST')).toEqual('FRM')
    })
    it('should return the empty string if nothing or invalid data is passed', () => {
      expect(getPrefixFromCode('')).toEqual('')
      expect(getPrefixFromCode(null)).toEqual('')
      expect(getPrefixFromCode({})).toEqual('')
    })
  })

  describe('anyEquals', () => {
    it('should return true if any of the argument is present in the set of array obtained from curried argument', () => {
      expect(anyEquals('FRM')(['FRM', 'THM'])).toEqual(true)
    })
    it('should return true if the argument is equal to the curried argument obtained', () => {
      expect(anyEquals('RES')(['RES'])).toEqual(true)
    })
    it('should return false if any of the argument is not present in the set of array obtained from curried argument', () => {
      expect(anyEquals('RES')(['FRM', 'THM'])).toEqual(false)
      expect(anyEquals({})(['FRM', 'THM', 'RES'])).toEqual(false)
      expect(anyEquals(null)(['FRM', 'THM', 'RES'])).toEqual(false)
      expect(anyEquals(undefined)(['FRM', 'THM', 'RES'])).toEqual(false)
      expect(anyEquals(true)(['FRM', 'THM', 'RES'])).toEqual(false)
      expect(anyEquals(1)(['FRM', 'THM', 'RES'])).toEqual(false)
    })
  })

  describe('isTypeOf', () => {
    it('should return true if the type of argument passed is of the same data type', () => {
      expect(isTypeOf('String')('Test')).toEqual(true)
      expect(isTypeOf('Object')({})).toEqual(true)
      expect(isTypeOf('Number')(1)).toEqual(true)
      expect(isTypeOf('Boolean')(true)).toEqual(true)
    })
    it('should return false if the type of argument passed is not of the same data type', () => {
      expect(isTypeOf('Number')('Test')).toEqual(false)
      expect(isTypeOf('Boolean')({})).toEqual(false)
      expect(isTypeOf('String')(1)).toEqual(false)
    })
  })

  describe('maybeThisOrType', () => {
    it('should return the parameter if the parameter is of same data type as fallback otherwise always return fallback', () => {
      expect(maybeThisOrType('TestOne')('Test')).toEqual('Test')
      expect(maybeThisOrType('TestOne')(1)).toEqual('TestOne')
      expect(maybeThisOrType(0)(5)).toEqual(5)
      expect(maybeThisOrType(0)('TestOne')).toEqual(0)
      expect(maybeThisOrType({})({ test: 'testOne' })).toEqual({ test: 'testOne' })
      expect(maybeThisOrType({})(null)).toEqual({})
      expect(maybeThisOrType(false)(true)).toEqual(true)
      expect(maybeThisOrType(false)(undefined)).toEqual(false)
      expect(maybeThisOrType(null)(null)).toEqual(null)
      expect(maybeThisOrType(null)('TestOne')).toEqual(null)
      expect(maybeThisOrType(undefined)(undefined)).toEqual(undefined)
      expect(maybeThisOrType(undefined)({})).toEqual(undefined)
    })
  })
})
