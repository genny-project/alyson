import { Box, HStack, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { split, pathOr } from 'ramda'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'

const FieldRow = ({ baseEntityCode, sourceCode, processId, data, index, mappedPcm }) => {
  const deleteEventCode = mappedPcm?.PRI_LOC2 || ''

  const eventAsk = getAskFromAttribute(mappedPcm?.PRI_QUESTION_CODE)(deleteEventCode)?.ask

  const rowColour = index % 2 === 0 ? '#F4F5F5' : '#FFFFFF'
  const seperator = ';'
  const names = split(seperator, data?.attributeName ?? '') || []
  const values = split(seperator, data?.valueString ?? '') || []

  const getArrayData = (names, values, index) => pathOr(pathOr('', index, values), index, names)

  const deconstruct = (names, values) => {
    const columnName = getArrayData(names, values, 0)
    const operatorName = getArrayData(names, values, 1)
    const valueName = getArrayData(names, values, 2)
    return {
      columnName,
      operatorName,
      valueName,
    }
  }
  const { columnName, operatorName, valueName } = deconstruct(names, values)

  const onDelete = () => {
    sendEvtClick({
      targetCode: baseEntityCode,
      sourceCode: sourceCode,
      parentCode: mappedPcm?.PRI_QUESTION_CODE,
      code: eventAsk?.question?.code || '',
      attributeCode: deleteEventCode,
      value: data?.valueString,
      processId: processId,
    })
  }

  return (
    <Box width="100%" bgColor={rowColour} py={2} px={3}>
      <HStack justify={'space-between'}>
        <Box w="30%">{columnName}</Box>
        <Box w="30%">{operatorName}</Box>
        <Box w="30%">{valueName}</Box>
        <Box>
          <IconButton
            onClick={onDelete}
            bgColor={rowColour}
            size={'sm'}
            icon={<FontAwesomeIcon icon={faTrash} />}
          />
        </Box>
      </HStack>
    </Box>
  )
}

export default FieldRow
