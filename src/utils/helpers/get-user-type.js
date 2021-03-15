import { find, includes, split, last, compose } from 'ramda'

const getUserType = compose(last, s => split('_', s || ''), find(includes('PRI_IS_')))

export default getUserType
