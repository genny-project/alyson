import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { adjust, append, filter, length, lensProp, remove, set } from 'ramda'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddressPicker from 'app/DTT/address/address_picker'
import { useState } from 'react'
import isNotEmpty from 'utils/helpers/is-not-empty'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const RepeatableAddressPicker = ({
  questionCode,
  onSendAnswer,
  data,
  regexPattern,
  errorMessage,
  parentCode,
  placeholder,
  attributeCode,
  targetCode,
  mandatory,
  clientId,
}) => {
  const [values, setValues] = useState(safelyParseJson(data?.value || '[]'))
  const makeChildData = value => set(lensProp('value'), value)(data)

  const updateValues = fn => {
    const newValues = fn()
    setValues(newValues)
    onSendAnswer(filter(isNotEmpty)(newValues || []))
  }

  const onRemove = index => {
    updateValues(() => remove(index, 1, values))
  }

  const onUpdateValue = index => value => {
    updateValues(() => adjust(index, () => value, values))
  }

  const onAddAnother = () => {
    setValues(append('')(values))
  }
  return (
    <VStack alignItems={'stretch'}>
      {(values || []).map((value, index) => (
        <HStack>
          <Box key={`${questionCode}-${index}`} width="full" paddingRight={2}>
            <AddressPicker
              questionCode={questionCode}
              regexPattern={regexPattern}
              errorMessage={errorMessage}
              parentCode={parentCode}
              placeholder={placeholder}
              attributeCode={attributeCode}
              targetCode={targetCode}
              mandatory={mandatory}
              clientId={clientId}
              data={makeChildData(value)}
              repeated={`${index}`}
              onSendAnswer={onUpdateValue(index)}
            />
          </Box>
          <Box
            onClick={() => onRemove(index)}
            cursor="pointer"
            color={'product.secondary'}
            borderRadius={'full'}
          >
            <FontAwesomeIcon transform={{ rotate: 45 }} icon={faPlus} size="lg" />
          </Box>
        </HStack>
      ))}

      <Box>
        {length(values) < 9 && (
          <Button
            fontWeight={'normal'}
            bg={'internmatch.secondaryAlpha10'}
            onClick={onAddAnother}
            color={'product.secondary'}
            borderRadius={'full'}
            fontSize={'sm'}
            paddingInline={8}
            w={'auto'}
          >
            <Box paddingRight={3}>Add Another</Box>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </Box>
    </VStack>
  )
}

export default RepeatableAddressPicker
