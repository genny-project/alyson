import { compose, isEmpty, not } from 'ramda'

const isNotEmpty = compose(not, isEmpty)

export default isNotEmpty
