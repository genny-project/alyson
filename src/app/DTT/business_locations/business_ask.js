import { HStack } from '@chakra-ui/react'
import RepeatableAsk from 'app/ASKS/repeatable-ask'
import { isEmpty, lensProp, set } from 'ramda'
import { useEffect, useState } from 'react'
import safelyParseJson from 'utils/helpers/safely-parse-json'
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
    <HStack alignItems={'flex-start'}>
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
      <RepeatableAsk
        questionCode={questionCode}
        regexPattern={regexPattern}
        errorMessage={errorMessage}
        parentCode={parentCode}
        placeholderName={placeholderName}
        attributeCode={attributeCode}
        targetCode={targetCode}
        mandatory={true}
        clientId={clientId}
        onSendAnswer={onTextUpdate}
        data={textData}
        component={Text.Write}
      />
    </HStack>
  )
}

export default BusinessAsk
