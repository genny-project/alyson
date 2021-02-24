import { filter, includes } from 'ramda'

const getActions = filter(v => includes('ACT_', v) && !includes('SCH_', v))
export const getTableActions = filter(includes('SCH_ACT_'))

export default getActions
