import sortByIndex from 'redux/db/utils/sort-by-index'

const unsortredArray = [
  { index: 5, name: 'five' },
  { index: 3, name: 'three' },
  { index: 2, name: 'two' },
  { index: 4, name: 'four' },
  { index: 0, name: 'zero' },
  { index: 1, name: 'one' },
]

const sortedArray = [
  { index: 0, name: 'zero' },
  { index: 1, name: 'one' },
  { index: 2, name: 'two' },
  { index: 3, name: 'three' },
  { index: 4, name: 'four' },
  { index: 5, name: 'five' },
]

describe('Sort By Index', () => {
  it('should return new sorted array in ascending order of index for the argument being passed', () => {
    expect(sortByIndex(unsortredArray)).toEqual(sortedArray)
  })
})
