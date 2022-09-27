import notEqual from 'utils/helpers/not-equal'
describe('Is not equal', () => {
  it('should return true if two arguments are not equal', () => {
    expect(notEqual('hello world')('john doe')).toEqual(true)
    expect(notEqual(['Hello', 'World', 1])(['html', 'css', 'react'])).toEqual(true)
    expect(notEqual({})({})).toEqual(false)
    expect(notEqual(['Hello', 'World', 1])(['Hello', 'World', 1])).toEqual(false)
  })
})
