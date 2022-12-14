import { map, compose } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'

const useGetDetailData = mappedPcm => {
  const questionCode = mappedPcm.PRI_QUESTION_CODE || ''

  const baseEntityCode = compose(useSelector, selectCodeUnary(questionCode))('targetCode') || ''

  const childAsks = compose(useSelector, selectCodeUnary(questionCode))('wholeData') || []
  const fields = map(childAsk => childAsk.attributeCode)(childAsks)

  return {
    baseEntityCode,
    fields,
  }
}

export default useGetDetailData
