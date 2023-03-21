import { isNotEmpty } from 'utils/helpers/is-null-or-undefined'

describe('Is Not Empty', () => {
  it('should true if the list is not empty and false if it is empty.', () => {
    expect(isNotEmpty()).toEqual(false)
    expect(isNotEmpty([])).toEqual(false)
    expect(isNotEmpty({})).toEqual(false)
    expect(isNotEmpty(null)).toEqual(true)
    expect(isNotEmpty(undefined)).toEqual(true)
    expect(isNotEmpty([''])).toEqual(true)
    expect(isNotEmpty('value')).toEqual(true)
    expect(isNotEmpty(1)).toEqual(true)
  })
})
