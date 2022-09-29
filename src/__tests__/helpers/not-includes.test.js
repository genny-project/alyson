import notIncludes from 'utils/helpers/not-includes'

describe('Returns a boolean on whether a value inlcudes the agrument or not.', () => {
  it('Should return true if the argument is not included and false otherside.', () => {
    expect(notIncludes('abc')(['abc', 'def'])).toEqual(false)
    expect(notIncludes('')(['abc', 'def', ''])).toEqual(false)
    expect(notIncludes('')(['abc', 'def'])).toEqual(true)
    expect(notIncludes()([])).toEqual(true)
    expect(notIncludes(undefined)(['abc', 'def'])).toEqual(true)
  })
})
