import { Box, Stack } from '@chakra-ui/react'
import { isEmpty, lensProp, set } from 'ramda'
import { useEffect, useState } from 'react'

import RepeatableAsk from 'app/ASKS/repeatable-ask'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useIsMobile } from 'utils/hooks'
import AddressPicker from 'app/DTT/address/address_picker'
import Text from 'app/DTT/text'

const BusinessAsk = ({
  questionCode,
  onSendAnswer,
  data,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
  attributeCode,
  targetCode,
  clientId,
}) => {
  const isMobile = useIsMobile()
  const [value, setValue] = useState(safelyParseJson(data?.value))

  let textValue = JSON.stringify(value?.departments || [''])
  let addressValue = value?.address || ''
  let departments = value?.departments || []

  const textData = set(lensProp('value'), textValue)(data)
  const addressData = set(lensProp('value'), addressValue)(data)

  const onAddressUpdate = answer => {
    setValue(set(lensProp('address'), answer), value)
  }

  const onTextUpdate = answer => {
    setValue(set(lensProp('departments'), answer), value)
  }

  useEffect(() => {
    if (!isEmpty(departments || '') && !isEmpty(addressValue || '')) {
      onSendAnswer(value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departments, addressValue])

  const departmentPlaceholderName = 'What departments/faculties do you have?'
  const departmentSecondaryPlaceholderName = 'Add another department/faculty?'

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      alignItems={'flex-start'}
      w="100%"
      spacing={5}
      bg="white"
      padding={8}
      borderRadius="3xl"
    >
      <Box w={'min(100%, 25rem)'}>
        <AddressPicker
          questionCode={questionCode}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
          mandatory={true}
          clientId={clientId}
          data={addressData}
          onSendAnswer={onAddressUpdate}
        />
      </Box>

      <Box w={'min(100%, 25rem)'}>
        <RepeatableAsk
          questionCode={questionCode}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={departmentPlaceholderName}
          secondPlaceholderName={departmentSecondaryPlaceholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
          mandatory={true}
          clientId={clientId}
          onSendAnswer={onTextUpdate}
          data={textData}
          deleteTop={false}
          component={Text.Write}
        />
      </Box>
    </Stack>
  )
}

export default BusinessAsk
