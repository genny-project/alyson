import { compose, includes, replace } from 'ramda'

const includesPriLoc = includes('PRI_LOC')
const numberLoc = compose(Number, replace('PRI_LOC', ''))

const sortPriLocs = (a: string) => (b: string) => {
  if (includesPriLoc(a) && includesPriLoc(b)) {
    let nA = numberLoc(a)
    let nB = numberLoc(b)
    return nA - nB
  }
  return a.localeCompare(b)
}

export default sortPriLocs
