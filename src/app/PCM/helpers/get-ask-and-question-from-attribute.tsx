import { find } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

/**
 * Takes in a questionGroupCode and an attributeCode, and returns an Ask and Question object for the Question in that question group
 * with the given attribute
 * `questionGroupCode` => `attributeCode`
 * @returns
 */
const getAskAndQuestionFromAttribute = (questionGroupCode: string) => (attributeCode: string) => {
  const ask =
    find((a: any) => a.attributeCode === attributeCode)(
      useSelector(selectCode(questionGroupCode, 'wholeData')),
    ) || {}
  const question =
    find((a: any) => a.targetCode === ask?.questionCode)(
      useSelector(selectCode(questionGroupCode, 'questions')),
    ) || {}

  return { ask, question }
}

export default getAskAndQuestionFromAttribute
