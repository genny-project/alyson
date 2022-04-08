import { append, forEach, keys, sort } from 'ramda'

const mapSpillLocs = (spillLocs: { [x: string]: string }) => (fn: (loc: string) => any) => {
  let out: any[] = []

  forEach(
    (x: string) => {
      out = append(fn(spillLocs[x]), out)
    },
    sort((a: string, b: string) => a.localeCompare(b), keys(spillLocs) as string[]),
  )

  return out
}

export default mapSpillLocs
