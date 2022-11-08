import useGetNonHiddenChildAsks from 'app/ASKS/utils/use-get-non-hidden-childasks'
import { filter, includes, map } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode, selectAttributes } from 'redux/db/selectors'

const useMapSbeRow = questionCode => {
  const vbeCode = 'VBE_ADD_ROW'

  const vbeDataKeys = useSelector(selectCode(vbeCode))
  const vbeData = useSelector(selectAttributes(vbeCode, vbeDataKeys))
  const asks = useGetNonHiddenChildAsks(questionCode)

  const validCodes = map(ask => ask.attributeCode)(asks)

  return filter(vbeAttribute => includes(vbeAttribute?.attributeCode || '')(validCodes))(vbeData)
}

export default useMapSbeRow
