import { compose, prop, split } from 'ramda'

const getDetailType = code => compose(prop(1), split(':'))(code || '')

export default getDetailType
