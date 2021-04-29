import { filter, includes } from 'ramda'

const getActions = sbe => {
  if (sbe) {
    return filter(v => includes('ACT_', v) && !includes('SCH_', v))(sbe)
  }
}
export const getTableActions = filter(includes('SCH_ACT_'))

export default getActions
