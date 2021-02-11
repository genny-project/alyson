import { filter, includes } from 'ramda'

const getActions = filter(includes('ACT_'))
export const getTableActions = filter(includes('SCH_ACT_'))

export default getActions
