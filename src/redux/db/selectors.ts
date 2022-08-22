import { RootState } from 'redux/types'
import { map, keys } from 'ramda'

export const selectCode = (code: string, childCode: string) => (state: RootState): any =>
  state.db[childCode ? `${code}@${childCode}` : code]

export const selectRows = (code: string) => (state: RootState): any =>
  state.db[`${code}@rows`] || []

export const selectCodes = (codes: Array<string> = [], attribute: string) => (state: RootState) =>
  map(code => selectCode(code, attribute)(state), codes || [])

export const selectAttributes = (parentCode: string, attributes: Array<string> = []) => (
  state: RootState,
) => map(attr => selectCode(parentCode, attr)(state), attributes)

export const selectWholeQuestionData = (questionList: Array<string>) => (state: RootState): any =>
  map(individualQuestion => selectCode(individualQuestion, 'wholeData')(state), questionList || [])

export const selectNote = (id: string) => (state: RootState) => state.db.NOTES[id]

export const selectMentors = (state: RootState) => state.db.MENTORS
export const selectMentee = (state: RootState) => state.db.MENTEE

// Developer selectors
export const selectKeys = (state: RootState) => keys(state.db)
