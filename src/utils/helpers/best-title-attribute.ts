import { always, cond, includes, T } from 'ramda'

const bestTitleAttribute = cond([
  [includes('APP_'), always('PRI_TITLE')],
  [T, always('PRI_NAME')],
])

export default bestTitleAttribute
