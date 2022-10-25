import { anyPass, includes, map } from 'ramda'

const includesAny = (...values) => anyPass(map(v => includes(v))(values))

export default includesAny
