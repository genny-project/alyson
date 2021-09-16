import { includes, reduce } from 'ramda'

const getFilteredDashboardSbes = reduce(
  (acc: Array<string>, value: string): Array<string> | [] =>
    (acc = includes('APPLICATION')(value) ? acc : acc?.concat(value)),
  [],
)

export default getFilteredDashboardSbes
