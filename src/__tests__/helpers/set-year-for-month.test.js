import setYearForMonth from 'utils/helpers/set-year-for-month'

describe('Set Year For Month', () => {
  it('should create a date string with month and year in ISO format replacing the current year with the argumenti if the argument is a valid year in string', () => {
    expect(setYearForMonth('2018')).toEqual('2018-01')
    expect(setYearForMonth('1877')).toEqual('1877-01')
  })

  it('should return a date string with month and year in ISO format with year set to the default year if the argument is a number', () => {
    expect(setYearForMonth(1800)).toEqual('1923-01')
  })

  it('should return a date string with month and year in ISO format with year set to the default year if length of the string passed as argument doesnt equal to 4', () => {
    expect(setYearForMonth('199')).toEqual('1923-01')
  })

  it('should return a date string with month and year in ISO format with year set to the default year if no argument is passed', () => {
    expect(setYearForMonth()).toEqual('1923-01')
  })
})
