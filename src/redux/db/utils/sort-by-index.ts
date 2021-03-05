import { sortBy, prop } from 'ramda'

const sortByIndex = sortBy(prop('index'))

export default sortByIndex
