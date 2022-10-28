import { map } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const useGetDetailData = mappedPcm => {
  const questionCode = mappedPcm.PRI_QUESTION_CODE || ''

  const baseEntityCode = useSelector(selectCode(questionCode, 'targetCode')) || ''

  const childAsks = useSelector(selectCode(questionCode, 'wholeData')) || []
  const fields = map(childAsk => childAsk.attributeCode)(childAsks)

  return {
    baseEntityCode,
    fields,
  }
}

export default useGetDetailData
