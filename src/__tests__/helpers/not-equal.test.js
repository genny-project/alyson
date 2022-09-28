import notEqual from 'utils/helpers/not-equal'

describe('Is not Equal', () => {
  it('should return true if the two values are not equal and false if they are are equal', () => {
    expect(notEqual([])([''])).toEqual(true)
    expect(notEqual(['value'])('value')).toEqual(true)
    expect(notEqual(1)(null)).toEqual(true)
    expect(notEqual()(null)).toEqual(true)
    expect(notEqual()()).toEqual(false)
    expect(notEqual('')('')).toEqual(false)
    expect(notEqual('value')('value')).toEqual(false)
    expect(notEqual(null)(null)).toEqual(false)
  })
})
