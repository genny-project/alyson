import { map } from 'ramda'

export const selectCode = (code, childCode) => state =>
  state.db[childCode ? `${code}@${childCode}` : code]

export const selectRows = code => state => state.db[`${code}@rows`]

export const selectCodes = (codes, attribute) => state =>
  map(code => selectCode(code, attribute)(state), codes)
