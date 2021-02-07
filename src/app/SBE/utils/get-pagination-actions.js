import { onSendMessage } from 'vertx'

const getPaginationActions = tableCode => ({
  lazy: () =>
    onSendMessage({
      code: 'QUE_TABLE_LAZY_LOAD',
      parentCode: 'QUE_TABLE_RESULTS_GRP',
      targetCode: tableCode,
    }),
  first: () =>
    onSendMessage({
      code: 'QUE_TABLE_FIRST_BTN',
      parentCode: 'QUE_TABLE_RESULTS_GRP',
      targetCode: tableCode,
    }),
  previous: () =>
    onSendMessage({
      code: 'QUE_TABLE_PREVIOUS_BTN',
      parentCode: 'QUE_TABLE_RESULTS_GRP',
      targetCode: tableCode,
    }),
  next: () =>
    onSendMessage({
      code: 'QUE_TABLE_NEXT_BTN',
      parentCode: 'QUE_TABLE_RESULTS_GRP',
      targetCode: tableCode,
    }),
  last: () =>
    onSendMessage({
      code: 'QUE_TABLE_LAST_BTN',
      parentCode: 'QUE_TABLE_RESULTS_GRP',
      targetCode: tableCode,
    }),
})

export default getPaginationActions
