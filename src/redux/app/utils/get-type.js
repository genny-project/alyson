import { includes, head, compose, prop } from 'ramda'

export const isAsk = includes('Ask')
export const isForm = (code = '') => code !== 'QUE_DRAFTS_GRP' && includes('_GRP', code)
export const isTable = includes('SBE_')
export const getQuestionCode = compose(prop('questionCode'), head)
