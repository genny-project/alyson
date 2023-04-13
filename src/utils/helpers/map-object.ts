import { map, toPairs } from 'ramda'

///Same as `R.map` however applies to an object, and maps on each key pair value
export const mapObject = (fn: (key: any, value: any) => any) => (object: {}) =>
  map((pair: any[]) => fn(pair[0], pair[1]))(toPairs(object))
