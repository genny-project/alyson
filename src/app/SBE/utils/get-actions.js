import { filter, includes } from 'ramda'

const getActions = filter(includes('ACT_'))

export default getActions
