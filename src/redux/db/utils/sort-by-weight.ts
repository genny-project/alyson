import { sortBy, prop } from 'ramda'

const sortByIndex = sortBy(prop('weight'))

export default sortByIndex
