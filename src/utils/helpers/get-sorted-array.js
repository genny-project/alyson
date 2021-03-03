import { sort } from 'ramda'

const compare = arrayKey => (a, b) =>
  a[arrayKey] > b[arrayKey] ? 1 : b[arrayKey] > a[arrayKey] ? -1 : 0

const getSortedArray = unsortedArray => arrayKey => sort(compare(arrayKey), unsortedArray)

export default getSortedArray
