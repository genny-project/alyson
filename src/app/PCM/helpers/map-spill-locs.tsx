import { append, forEach, keys, sort } from 'ramda'

/**
 * Returns a list of JSX.Elements created from fn, in order
 */
const mapSpillLocs = (spillLocs: { [x: string]: string }) => (fn: (loc: string) => JSX.Element) => {
  let out: JSX.Element[] = []

  forEach(
    (x: string) => {
      out = append(fn(spillLocs[x]), out)
    },
    sort((a: string, b: string) => a.localeCompare(b), keys(spillLocs) as string[]),
  )

  return out
}

export default mapSpillLocs
