import { Box, HStack, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { split, length, includes } from 'ramda'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { format } from 'date-fns'
import { isNotEmpty } from 'utils/helpers/is-null-or-undefined'

const FieldRow = ({ baseEntityCode, sourceCode, processId, data, index, mappedPcm }) => {
  const deleteEventCode = mappedPcm?.PRI_LOC2 || ''

  const eventAsk = getAskFromAttribute(mappedPcm?.PRI_QUESTION_CODE)(deleteEventCode)?.ask

  const rowColour = index % 2 === 0 ? '#F4F5F5' : '#FFFFFF'
  const seperator = ';'
  const names = split(seperator, data?.attributeName ?? '') || []
  const values = split(seperator, data?.valueString ?? '') || []

  const component = data?.attribute?.dataType?.component || ''
  const typeName = data?.attribute?.dataType?.typeName || ''

  const getArrayData = (names, values, index) =>
    length(names) >= index + 1 ? names[index] : length(values) >= index + 1 ? values[index] : ''

  const deconstruct = (names, values) => {
    const columnName = getArrayData(names, values, 0)
    const operatorName = getArrayData(names, values, 1)
    const valueNameData = getArrayData(names, values, 2)

    const isDate = component === 'date' && isNotEmpty(valueNameData)
    const includeTime = isDate && includes('LocalDateTime', typeName)
    const valueName = isDate
      ? format(new Date(valueNameData), includeTime ? 'dd MMM yyyy, hh:mm' : 'dd MMM yyyy')
      : valueNameData
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
