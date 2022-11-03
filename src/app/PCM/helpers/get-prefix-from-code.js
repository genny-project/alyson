import { compose, head, split } from 'ramda'

const getPrefixFromCode = compose(head, split('_'))

export default getPrefixFromCode
