import { compose, map } from 'ramda'

import { selectCodeUnary } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const useGetDetailData = mappedPcm => {
  const questionCode = mappedPcm.PRI_QUESTION_CODE || ''

  const baseEntityCode = compose(useSelector, selectCodeUnary(questionCode))('targetCode') || ''

  const childAsks = compose(useSelector, selectCodeUnary(baseEntityCode))('allAttributes') || []
  const fields = map(childAsk => childAsk.attributeCode)(childAsks)

  return {
    baseEntityCode,
    fields,
  }
}

export default useGetDetailData
