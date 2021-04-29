const fixLnk = (code: string) => (code.indexOf('_LNK_') === 0 ? `PRI${code}` : code)

export default fixLnk
