import setYearForDate from 'utils/helpers/set-year-for-date'

describe('Set Year For Date', () => {
  it('should create a date string in ISO format replacing the current year with the argumenti if the argument is a valid year in string', () => {
    expect(setYearForDate('2000')).toEqual('2000-01-01')
    expect(setYearForDate('1990')).toEqual('1990-01-01')
    expect(setYearForDate('1911')).toEqual('1911-01-01')
  })

  it('should return a date string in ISO format with year set to the default year if the argument is a number', () => {
    expect(setYearForDate(1700)).toEqual('1921-01-01')
  })

  it('should return a date string in ISO format with year set to the default year if length of the string passed as argument doesnt equal to 4', () => {
    expect(setYearForDate('900')).toEqual('1921-01-01')
  })

  it('should return a date string in ISO format with year set to the default year if no argument is passed', () => {
    expect(setYearForDate()).toEqual('1921-01-01')
  })
})
