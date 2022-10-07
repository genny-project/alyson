import { filter, startsWith, map, reduce } from 'ramda'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const getFilterAsks = parentParentCode => parentCode => {
  const codePrefix = 'QUE_FILTER_VALUE_'

  const childAskCodes = filter(code => startsWith(codePrefix)(code))(
    map(ask => ask.questionCode)(
      useSelector(selectCode(parentParentCode, parentCode))?.childAsks || [],
    ),
  )

  return reduce((acc, elem) => {
    return { ...acc, [elem.questionCode]: elem }
  }, {})(useSelector(selectAttributes(parentCode, childAskCodes)))
}

export default getFilterAsks
