import { Box, Button, HStack } from '@chakra-ui/react'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import PcmField from 'app/PCM/components/pcm-field'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { useState } from 'react'
import deArrayifyValue from 'utils/helpers/de-arrayify-value'

const TemplateSBERowAdd = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4, PRI_QUESTION_CODE } = mappedPcm

  const addAskData = getAskFromAttribute(PRI_QUESTION_CODE)(PRI_LOC4)?.ask || {}

  const buttonName = addAskData?.name || addAskData?.attributeCode

  const locColumn = 0
  const locOperator = 1
  const locValue = 2

  const [columnValue, setColumnValue] = useState()
  const [operatorValue, setOperatorValue] = useState()
  const [valueValue, setValueValue] = useState()

  const getSetter = loc => {
    return loc === locColumn
      ? setColumnValue
      : loc === locOperator
      ? setOperatorValue
      : loc === locValue
      ? setValueValue
      : () => {}
  }

  const setValue = loc => getSetter(loc)

  const answerCallback = loc => (askData, value) => {
    setValue(loc)(deArrayifyValue(value))
  }
  const fieldConfig = loc => {
    return { parentCode: 'VBE_ADD_ROW', answerCallback: answerCallback(loc) }
  }

  const onAdd = () => {
    const outputAttributeCode = `FLC_${columnValue}`
    const outputValue = `${operatorValue};${valueValue}`

    const outputAskData = { ...addAskData, attributeCode: outputAttributeCode }
    createSendAnswer(outputAskData)(outputValue)
    setValue(locColumn)('')
    setValue(locOperator)('')
    setValue(locValue)('')
  }

  return (
    <Box>
      <HStack>
        <PcmField
          code={PRI_LOC1}
          mappedPcm={mappedPcm}
          config={fieldConfig(locColumn)}
          depth={depth}
        />
        <PcmField
          code={PRI_LOC2}
          mappedPcm={mappedPcm}
          config={fieldConfig(locOperator)}
          depth={depth}
        />
        <PcmField
          code={PRI_LOC3}
          mappedPcm={mappedPcm}
          config={fieldConfig(locValue)}
          depth={depth}
        />
        <Button onClick={onAdd} disabled={!columnValue || !operatorValue || !valueValue}>
          {buttonName}
        </Button>
      </HStack>
    </Box>
  )
}

export default TemplateSBERowAdd
