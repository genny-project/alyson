import { compose, cond, identity, includes, last, split, T } from 'ramda'

const fixLnk = (code = '') =>
  cond([
    [includes('_LNK_'), compose(last, split('__'))],
    [T, identity],
  ])(code)

export default fixLnk
