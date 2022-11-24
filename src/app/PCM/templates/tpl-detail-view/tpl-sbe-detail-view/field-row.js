import { Box, HStack, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { split } from 'ramda'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'

const FieldRow = ({ baseEntityCode, sourceCode, processId, data, index, mappedPcm }) => {
  const deleteEventCode = mappedPcm?.PRI_LOC2 || ''

  const eventAsk = getAskFromAttribute(mappedPcm?.PRI_QUESTION_CODE)(deleteEventCode)?.ask

  const rowColour = index % 2 === 0 ? '#F4F5F5' : '#FFFFFF'
  const seperator = ';'
  const names = split(seperator, data?.attributeName ?? '') || []
  const values = split(seperator, data?.value ?? '') || []

  const columnCode = values[0] ?? ''
  const operatorCode = values[1] ?? ''
  const valueCode = values[2] ?? ''

  const columnName = names[0] ?? columnCode
  const operatorName = names[1] ?? operatorCode
  const valueName = names[2] ?? valueCode

  const onDelete = () => {
    sendEvtClick({
      targetCode: baseEntityCode,
      sourceCode: sourceCode,
      parentCode: mappedPcm?.PRI_QUESTION_CODE,
      code: eventAsk?.question?.code || '',
      attributeCode: deleteEventCode,
      value: columnCode,
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
