import { useState } from 'react'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { Box, Button, HStack } from '@chakra-ui/react'
import SBEAddElement from './sbe-add-element'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'

const TemplateSBERowAdd = ({ mappedPcm }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4, PRI_QUESTION_CODE } = mappedPcm

  const addAskData = getAskFromAttribute(PRI_QUESTION_CODE)(PRI_LOC4)?.ask || {}

  const virtualTargetCode = 'VBE_ADD_ROW'

  const buttonName = addAskData?.name || addAskData?.attributeCode

  const [columnValue, setColumnValue] = useState()
  const [operatorValue, setOperatorValue] = useState()
  const [valueValue, setValueValue] = useState()

  const onColumnUpdate = value => {
    setColumnValue(value)
    setOperatorValue('')
    setValueValue('')
  }

  const onOperatorUpdate = value => {
    setOperatorValue(value)
  }

  const onValueUpdate = value => {
    setValueValue(value)
  }

  const onAdd = () => {
    const outputAttributeCode = `FLC_${columnValue}`
    const outputValue = `${operatorValue};${
      valueValue?.value || valueValue?.parsed || valueValue || ''
    }`

    const outputAskData = { ...addAskData, attributeCode: outputAttributeCode }
    createSendAnswer(outputAskData)(outputValue)

    setColumnValue('')
    setOperatorValue('')
    setValueValue('')
  }

  return (
    <Box>
      <HStack alignItems={'flex-start'}>
        <SBEAddElement
          parentCode={PRI_QUESTION_CODE}
          attributeCode={PRI_LOC1}
          value={columnValue}
          sourceCode={addAskData.sourceCode}
          onChange={onColumnUpdate}
          targetCode={virtualTargetCode}
          disabled={false}
        />
        <SBEAddElement
          parentCode={PRI_QUESTION_CODE}
          attributeCode={PRI_LOC2}
          value={operatorValue}
          sourceCode={addAskData.sourceCode}
          onChange={onOperatorUpdate}
          targetCode={virtualTargetCode}
          disabled={!columnValue}
        />
        <SBEAddElement
          parentCode={PRI_QUESTION_CODE}
          attributeCode={PRI_LOC3}
          value={valueValue}
          sourceCode={addAskData.sourceCode}
          onChange={onValueUpdate}
          targetCode={virtualTargetCode}
          disabled={!operatorValue}
        />
        <Box alignSelf={'center'}>
          <Button onClick={onAdd} disabled={!columnValue || !operatorValue || !valueValue}>
            {buttonName}
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}

export default TemplateSBERowAdd
