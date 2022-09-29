import { compose, includes, not } from 'ramda'

const notIncludes = x => compose(not, includes(x))

export default notIncludes
