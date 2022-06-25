import { includes } from 'ramda'
import { MsgPayload } from 'redux/types'

export const isAsk = includes('Ask')
export const isForm = (code = '') => code !== 'QUE_DRAFTS_GRP' && includes('_GRP', code)
//This fixed a crash but I don't know if I should have done it
export const getQuestionCode: (items: MsgPayload['items']) => string = items =>
  items[0]?.questionCode || ''
