import { Box, Stack } from '@chakra-ui/react'
import { isEmpty, lensProp, set } from 'ramda'
import { useEffect, useState } from 'react'

import RepeatableAsk from 'app/ASKS/repeatable-ask'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useIsMobile } from 'utils/hooks'
import AddressPicker from '../address/address_picker'
import Text from '../text'

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
  const [value, setValue] = useState(safelyParseJson(data?.value), {})

  const textValue = JSON.stringify(value?.departments || [''])
  const addressValue = value?.address || ''

  const textData = set(lensProp('value'), textValue)(data)
  const addressData = set(lensProp('value'), addressValue)(data)

  const onAddressUpdate = answer => {
    setValue(set(lensProp('address'), answer), value)
  }

  const onTextUpdate = answer => {
    setValue(set(lensProp('departments'), answer), value)
  }

  useEffect(() => {
    if (!isEmpty(value?.departments || '') && !isEmpty(value?.address || '')) {
      onSendAnswer(value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Stack direction={isMobile ? 'column' : 'row'} alignItems={'flex-start'} w="100%" spacing={5}>
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
          placeholderName={'What departments/faculties do you have?'}
          secondPlaceholderName={'Would you like to add another department?'}
          attributeCode={attributeCode}
          targetCode={targetCode}
          mandatory={true}
          clientId={clientId}
          onSendAnswer={onTextUpdate}
          data={textData}
          deleteTop={false}
          extraWidth={'90%'}
          component={Text.Write}
        />
      </Box>
    </Stack>
  )
}

export default BusinessAsk
