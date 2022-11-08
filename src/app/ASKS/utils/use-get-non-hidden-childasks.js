import { filter } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const useGetNonHiddenChildAsks = questionCode => {
  const allChildAsks = useSelector(selectCode(questionCode, 'wholeData'))
  return filter(ask => !(ask?.hidden ?? true))(allChildAsks || []) || []
}

export default useGetNonHiddenChildAsks
