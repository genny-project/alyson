import { find, isEmpty } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import debugOut from 'utils/debug-out'

/**
 * Takes in a questionGroupCode and an attributeCode, and returns an Ask and Question object for the Question in that question group
 * with the given attribute
 * `questionGroupCode` => `attributeCode`
 * @returns
 */
const getAskFromAttribute = (questionGroupCode: string) => (attributeCode: string) => {
  const wholeData = useSelector(selectCode(questionGroupCode, 'wholeData'))

  if (!wholeData || isEmpty(wholeData)) {
    debugOut.error(`Got empty from ${questionGroupCode}@wholeData!`)
    return {}
  }

  return find((a: any) => a.attributeCode === attributeCode)(wholeData)
}

export default getAskFromAttribute
