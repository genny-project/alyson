import { isNullOrUndefined } from 'utils/helpers/is-null-or-undefined'

describe('Is Null Or Undefined', () => {
  it('should return true if the value being passed as argument is null or undefined, else should return false', () => {
    expect(isNullOrUndefined()).toEqual(true)
    expect(isNullOrUndefined(null)).toEqual(true)
    expect(isNullOrUndefined(undefined)).toEqual(true)
    expect(isNullOrUndefined('value')).toEqual(false)
    expect(isNullOrUndefined(1)).toEqual(false)
    expect(isNullOrUndefined([])).toEqual(false)
    expect(isNullOrUndefined({})).toEqual(false)
  })
})
