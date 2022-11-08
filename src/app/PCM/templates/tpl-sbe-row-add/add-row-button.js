import { Button } from '@chakra-ui/react'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import sbeRowExtractValues from './sbe-row-extract-values'
import useMapSbeRow from './use-map-sbe-row'

const AddRowButton = ({ mappedPcm }) => {
  const questionCode = mappedPcm.PRI_QUESTION_CODE
  const attributeCode = mappedPcm.PRI_LOC4

  const askData = getAskFromAttribute(questionCode)(attributeCode)

  const mappedRow = useMapSbeRow(questionCode)

  if (!attributeCode || !askData) {
    return null
  }

  const { columnValue, optionValue, valueValue } = sbeRowExtractValues(mappedRow)

  const name = askData?.name || askData?.attributeCode

  const outputAttributeCode = `FLC_${columnValue}`
  const outputValue = `${optionValue}:${valueValue}`

  const outputAskData = { ...askData, attributeCode: outputAttributeCode }

  const onClick = () => {
    createSendAnswer(outputAskData)(outputValue)
  }

  return <Button onClick={onClick}>{name}</Button>
}

export default AddRowButton
