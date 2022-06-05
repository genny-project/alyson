import { find } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

/**
 * Takes in a questionGroupCode and an attributeCode, and returns an Ask and Question object for the Question in that question group
 * with the given attribute
 * `questionGroupCode` => `attributeCode`
 * @returns
 */
const getAskFromAttribute = (questionGroupCode: string) => (attributeCode: string) => {
  return (
    find((a: any) => a.attributeCode === attributeCode)(
      useSelector(selectCode(questionGroupCode, 'wholeData')),
    ) || {}
  )
}

export default getAskFromAttribute
