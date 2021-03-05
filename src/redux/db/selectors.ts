import { RootState } from 'redux/store'
import { map, keys } from 'ramda'

export const selectCode = (code: string, childCode: string) => (state: RootState) =>
  state.db[childCode ? `${code}@${childCode}` : code]

export const selectRows = (code: string) => (state: RootState) => state.db[`${code}@rows`] || []

export const selectCodes = (codes: Array<string>, attribute: string) => (state: RootState) =>
  map(code => selectCode(code, attribute)(state), codes)

export const selectAttributes = (parentCode: string, attributes: Array<string>) => (
  state: RootState,
) => map(attr => selectCode(parentCode, attr)(state), attributes)

// Developer selectors

export const selectKeys = (state: RootState) => keys(state.db)
