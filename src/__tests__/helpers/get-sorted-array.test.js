import getSortedArray from 'utils/helpers/get-sorted-array'

describe('Get Sorted Array', () => {
  it('should return array sorted in ascending order based on the value of the chosen key of array', () => {
    const unsortedArrayOne = [
      { name: 'apple', position: 'fifth', weight: 5 },
      { name: 'elephant', position: 'third', weight: 3 },
      { name: 'dog', position: 'second', weight: 2 },
      { name: 'cat', position: 'first', weight: 1 },
      { name: 'ball', position: 'fourth', weight: 4 },
    ]

    const sortedArrayBasedOnWeight = [
      { name: 'cat', position: 'first', weight: 1 },
      { name: 'dog', position: 'second', weight: 2 },
      { name: 'elephant', position: 'third', weight: 3 },
      { name: 'ball', position: 'fourth', weight: 4 },
      { name: 'apple', position: 'fifth', weight: 5 },
    ]

    const sortedArrayBasedOnName = [
      { name: 'apple', position: 'fifth', weight: 5 },
      { name: 'ball', position: 'fourth', weight: 4 },
      { name: 'cat', position: 'first', weight: 1 },
      { name: 'dog', position: 'second', weight: 2 },
      { name: 'elephant', position: 'third', weight: 3 },
    ]

    const sortedArrayBasedOnPosition = [
      { name: 'apple', position: 'fifth', weight: 5 },
      { name: 'cat', position: 'first', weight: 1 },
      { name: 'ball', position: 'fourth', weight: 4 },
      { name: 'dog', position: 'second', weight: 2 },
      { name: 'elephant', position: 'third', weight: 3 },
    ]

    expect(getSortedArray(unsortedArrayOne)('weight')).toEqual(sortedArrayBasedOnWeight)
    expect(getSortedArray(unsortedArrayOne)('name')).toEqual(sortedArrayBasedOnName)
    expect(getSortedArray(unsortedArrayOne)('position')).toEqual(sortedArrayBasedOnPosition)
  })
})
