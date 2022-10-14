import { equals, find, isEmpty } from 'ramda'
import debugOut from 'utils/debug-out'
import getAssociatedObjectListFromQuestionGroup from 'app/PCM/helpers/get-whole-data-from-question-group'
/**
 * Takes in a questionGroupCode and an attributeCode, and returns an Ask and Question object for the Question in that question group
 * with the given attribute
 * `questionGroupCode` => `attributeCode`
 * @returns
 */
const getAskFromAttribute = (questionGroupCode: string) => (attributeCode: string) => {
  let wholeObjectList = getAssociatedObjectListFromQuestionGroup(questionGroupCode)('wholeData')
  let isWholeObjectListFalsy = !wholeObjectList || isEmpty(wholeObjectList)
  let matchingObjectBasedOnAttributeCode = find((individualObject: any) =>
    equals(individualObject?.attributeCode)(attributeCode),
  )(wholeObjectList || [])

  if (isWholeObjectListFalsy) {
    debugOut.error(`Got empty from ${questionGroupCode}@wholeData!`)
  }

  return isWholeObjectListFalsy ? {} : matchingObjectBasedOnAttributeCode
}

export default getAskFromAttribute
