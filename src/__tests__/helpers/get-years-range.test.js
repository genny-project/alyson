import yearRange from 'utils/helpers/get-years-range'

describe('Get Years Array', () => {
  it('should create an array of the length equaling to the argument being passed which holds years recursively deducted from the current year', () => {
    const currentYear = new Date().getFullYear()

    expect(yearRange(5)).toEqual([
      currentYear,
      currentYear - 1,
      currentYear - 2,
      currentYear - 3,
      currentYear - 4,
    ])
    expect(yearRange(10)).toEqual([
      currentYear,
      currentYear - 1,
      currentYear - 2,
      currentYear - 3,
      currentYear - 4,
      currentYear - 5,
      currentYear - 6,
      currentYear - 7,
      currentYear - 8,
      currentYear - 9,
    ])
    expect(yearRange(15)).toEqual([
      currentYear,
      currentYear - 1,
      currentYear - 2,
      currentYear - 3,
      currentYear - 4,
      currentYear - 5,
      currentYear - 6,
      currentYear - 7,
      currentYear - 8,
      currentYear - 9,
      currentYear - 10,
      currentYear - 11,
      currentYear - 12,
      currentYear - 13,
      currentYear - 14,
    ])
  })
})
