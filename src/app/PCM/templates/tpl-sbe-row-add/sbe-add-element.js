import { Box } from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { not, set, lensProp } from 'ramda'
import debugOut from 'utils/debug-out'

const SBEAddElement = ({
  parentCode,
  attributeCode,
  value,
  onChange,
  sourceCode,
  targetCode,
  disabled,
}) => {
  const askData = getAskFromAttribute(parentCode)(attributeCode)?.ask || {}

  const component = askData?.question?.attribute?.dataType.component || ''

  if (not(component)) {
    debugOut.warn(`Component for ${attributeCode} was falsy! Defaulting to a text component`)
  }

  const askDataWithDisabled = set(lensProp('disabled'), disabled, askData)

  return (
    <Box width="25ch">
      <Ask
        passedAskData={askDataWithDisabled}
        answerCallback={(askData, value) => {
          onChange(typeof value === 'object' ? value[0] : value)
        }}
        passedValue={value}
        sourceCode={sourceCode}
        passedTargetCode={targetCode}
        parentCode={parentCode}
        skipRedux={true}
        config={{ mt: 0, vertical: false }}
      />
    </Box>
  )
}

export default SBEAddElement
