import { append, forEach, keys, sort } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

/**
 * Returns a list of JSX.Elements created from fn, in order
 */
const mapSpillLocs = (pcmCode: string, spillLocs: { [x: string]: string }) => (
  fn: (loc: string) => JSX.Element,
) => {
  let out: JSX.Element[] = []

  forEach(
    (x: string) => {
      if (fn(spillLocs[x])) {
        out = append(fn(spillLocs[x])!, out)
      }
    },
    sort((a: string, b: string) => useSortLoc(pcmCode, a, b), keys(spillLocs) as string[]),
  )

  return out
}

/**
 * Sorts attributes by their weight. Might be a good general helper function later on
 * @param pcmCode - Code of the pcm
 * @param a - First field
 * @param b - Second field
 * @returns - a.weight-b.weight. If a or b do not have a weight, they are set to 0
 */
const useSortLoc = (pcmCode: string, a: string, b: string): number => {
  let aWeight = useSelector(selectCode(pcmCode, a))?.weight || 0
  let bWeight = useSelector(selectCode(pcmCode, b))?.weight || 0

  return aWeight - bWeight
}

export default mapSpillLocs
