import { equals, find, isEmpty, propEq } from 'ramda'
import debugOut from 'utils/debug-out'
import getAssociatedObjectListFromQuestionGroup from 'app/PCM/helpers/get-whole-data-from-question-group'
/**
 * Takes in a questionCode or questionGroupCode and an attributeCode, and returns an Ask and Question object for the Question in that question group
 * with the given attribute. If the question is not a group, it just returns the ask, if that ask is mapped to the correct attribute
 * `questionGroupCode` => `attributeCode`
 * @returns
 */
const getAskFromAttribute = (questionCode: string) => (attributeCode: string) => {
  let wholeObjectList = getAssociatedObjectListFromQuestionGroup(questionCode)('wholeData')
  let isWholeObjectListFalsy = !wholeObjectList || isEmpty(wholeObjectList)
  let rawObject = getAssociatedObjectListFromQuestionGroup(questionCode)('raw')
  let isRawObjectFalsy = !rawObject || isEmpty(rawObject)
  let matchingObjectBasedOnAttributeCode = find((individualObject: any) =>
    equals(individualObject?.attributeCode)(attributeCode),
  )(wholeObjectList || [])

  let rawObjectHasCorrectAttribute = propEq('attributeCode', attributeCode)(rawObject || {})

  if (isWholeObjectListFalsy && isRawObjectFalsy) {
    debugOut.error(`Got empty from ${questionCode}@wholeData and ${questionCode}@raw!`)
  }

  if (isWholeObjectListFalsy && !isRawObjectFalsy && !rawObjectHasCorrectAttribute) {
    debugOut.error(`The question ${questionCode} does not map to attribute ${attributeCode}`)
  }

  return {
    ask: isWholeObjectListFalsy
      ? isRawObjectFalsy || !rawObjectHasCorrectAttribute
        ? {}
        : rawObject
      : matchingObjectBasedOnAttributeCode,
    isChildAsk: !isWholeObjectListFalsy,
  }
}

export default getAskFromAttribute
