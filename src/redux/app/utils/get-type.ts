import { includes, isEmpty } from 'ramda'
import { MsgPayload } from 'redux/types'
import debugOut from 'utils/debug-out'

export const isAsk = includes('Ask')
export const isForm = (code = '') => code !== 'QUE_DRAFTS_GRP' && includes('_GRP', code)
//This fixed a crash but I don't know if I should have done it
export const getQuestionCode: (items: MsgPayload['items']) => string = items => {
  if (!items) {
    debugOut.warn('getQuestionCode items is undefined!')
    return ''
  }
  if (isEmpty(items)) {
    debugOut.warn('getQuestionCode items is empty')
    return ''
  }
  return items[0]?.questionCode || ''
}
