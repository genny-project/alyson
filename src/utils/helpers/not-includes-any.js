import { allPass, map } from 'ramda'
import notIncludes from './not-includes'

const notIncludesAny = (...values) => allPass(map(v => notIncludes(v))(values))

export default notIncludesAny
