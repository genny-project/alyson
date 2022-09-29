import { compose, includes, not } from 'ramda'

const notIncludes = x => compose(not, includes(x))

export default notIncludes

notIncludes(3)([1, 2, 3])
