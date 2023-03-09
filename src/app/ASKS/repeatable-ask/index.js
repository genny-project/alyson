import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  adjust,
  append,
  compose,
  filter,
  includes,
  isEmpty,
  length,
  lensProp,
  not,
  remove,
  set,
} from 'ramda'
import { useState } from 'react'
import isNotEmpty from 'utils/helpers/is-not-empty'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const RepeatableAsk = ({
  questionCode,
  onSendAnswer,
  data,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
  attributeCode,
  targetCode,
  mandatory,
  clientId,
  component,
  maxOptions = 10,
  emptyValue = '',
  addButtonFirstText = 'Add New',
  addButtonAnotherText = 'Add Another',
}) => {
  const defaultValue = mandatory ? `${emptyValue}` : ''

  const [values, setValues] = useState(safelyParseJson(data?.value || `[${defaultValue}]`))
  const makeChildData = value => set(lensProp('value'), value)(data)

  const validAnswer = compose(not, includes(''))(values)

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
    setValues(append(emptyValue)(values))
  }

  const Element = component

  return (
    <VStack w="100%" justifyItems="flex-start" alignItems="flex-start">
      {(values ?? []).map((value, index) => (
        <HStack alignItems={'flex-start'}>
          <Box w="max(100%, 25rem)">
            <Element
              key={`${questionCode}-${index}`}
              questionCode={questionCode}
              regexPattern={regexPattern}
              errorMessage={errorMessage}
              parentCode={parentCode}
              placeholderName={placeholderName}
              attributeCode={attributeCode}
              targetCode={targetCode}
              mandatory={mandatory}
              clientId={clientId}
              data={makeChildData(value)}
              repeated={`${index}`}
              onSendAnswer={onUpdateValue(index)}
            />
          </Box>
          {((mandatory && index !== 0) || !mandatory) && (
            <Button onClick={() => onRemove(index)}>X</Button>
          )}
        </HStack>
      ))}

      <Button
        disabled={!validAnswer || length(values) >= maxOptions}
        fontWeight={'normal'}
        bg={'#FDEDE9'}
        onClick={onAddAnother}
        color={'product.secondary'}
        borderRadius={'md'}
        fontSize={'sm'}
        paddingInline={8}
        w={'auto'}
      >
        <Box paddingRight={3}>{isEmpty(values) ? addButtonFirstText : addButtonAnotherText}</Box>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </VStack>
  )
}

export default RepeatableAsk
