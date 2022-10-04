import { filter, startsWith } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const getActiveAsk = parentParentCode => parentCode => {
  const codePrefix = 'QUE_FILTER_VALUE_'

  const childAsks = useSelector(selectCode(parentParentCode, parentCode))?.childAsks || []

  const activeAsks = filter(
    childAsk => startsWith(codePrefix)(childAsk.questionCode) && !childAsk.hidden,
  )(childAsks)
  return activeAsks.length > 0 ? activeAsks[0] : undefined
}

export default getActiveAsk
