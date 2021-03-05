import yearRange from 'utils/helpers/get-years-range'

describe('Get Years Array', () => {
  it('should create an array of the length equaling to the argument being passed which holds years recursively deducted from the current year', () => {
    expect(yearRange(5)).toEqual([2021, 2020, 2019, 2018, 2017])
    expect(yearRange(10)).toEqual([2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012])
    expect(yearRange(15)).toEqual([
      2021,
      2020,
      2019,
      2018,
      2017,
      2016,
      2015,
      2014,
      2013,
      2012,
      2011,
      2010,
      2009,
      2008,
      2007,
    ])
  })
})
