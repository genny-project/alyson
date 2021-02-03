export const selectCode = (code, childCode) => state =>
  state.db[`${code}${childCode ? '@' + childCode : ''}`]
export const selectRows = code => state => state.db[`${code}@rows`]
