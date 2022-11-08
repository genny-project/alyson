import { Button } from '@chakra-ui/react'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import useMapSbeRow from './use-map-sbe-row'

const AddRowButton = ({ mappedPcm }) => {
  const questionCode = mappedPcm.PRI_QUESTION_CODE
  const attributeCode = mappedPcm.PRI_LOC4

  const askData = getAskFromAttribute(questionCode)(attributeCode)

  const mappedRow = useMapSbeRow(questionCode)

  console.log(mappedRow)

  if (!attributeCode || !askData) {
    return null
  }

  const name = askData?.name || askData?.attributeCode

  return <Button>{name}</Button>
}

export default AddRowButton
