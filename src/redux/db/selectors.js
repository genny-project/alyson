export const selectCode = (code, childCode) => state =>
  state.db[childCode ? `${code}@${childCode}` : code]
export const selectRows = code => state => state.db[`${code}@rows`]
