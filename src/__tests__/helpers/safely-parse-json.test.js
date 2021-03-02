import safelyParseJson from 'utils/helpers/safely-parse-json'

describe('Safely Parse Json', () => {
  it('should return parsed JSON value if a JSON object is passed', () => {
    const covidTest = { name: 'John', result: 'negative' }
    expect(safelyParseJson(JSON.stringify(covidTest))).toEqual({ name: 'John', result: 'negative' })
  })

  it('should return the default value if no argument to be parsed is provided to the function', () => {
    expect(safelyParseJson(null, { name: 'Henry', result: 'negative' })).toEqual({
      name: 'Henry',
      result: 'negative',
    })
  })

  it('should return an empty object if there is no value to be parsed and the default value is not provided', () => {
    expect(safelyParseJson()).toEqual({})
    expect(safelyParseJson(null)).toEqual({})
  })
})
