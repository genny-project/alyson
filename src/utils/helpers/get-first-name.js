import { compose, ifElse, head, split } from 'ramda'
import { isString } from 'utils/helpers/is-type'

const getFirstName = ifElse(isString, compose(head, split(' ')), () => undefined)

export default getFirstName
