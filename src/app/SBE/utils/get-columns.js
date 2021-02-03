import { filter, includes, replace } from 'ramda'

const getColumns = filter(includes('COL_'))

export default getColumns
export const getAttribute = replace('COL_', '')
