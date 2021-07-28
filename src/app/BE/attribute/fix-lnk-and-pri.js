import { compose, cond, identity, includes, last, split, T } from 'ramda'

const fixLnkAndPri = (code = '') =>
  cond([
    [includes('_LNK_'), compose(last, split('__'))],
    [includes('_PRI_'), compose(last, split('__'))],
    [T, identity],
  ])(code)

export default fixLnkAndPri
