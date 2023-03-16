import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { isNotEmpty } from 'utils/helpers/is-null-or-undefined'

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
  firstWidth = '100%',
  extraWidth = '100%',
  deleteTop = true,
  emptyValue = '',
  addButtonFirstText = 'Add New',
  addButtonAnotherText = 'Add Another',
  secondPlaceholderName = '',
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

  const topMap = { top: 1 }
  const bottomMap = { bottom: 1 }
  const propMap = deleteTop ? topMap : bottomMap

  const Element = component

  return (
    <VStack w="100%" justifyItems="flex-start" alignItems="flex-start">
      {(values ?? []).map((value, index) => (
        <HStack
          key={`${questionCode}-${index}`}
          w={index === 0 ? firstWidth : extraWidth}
          alignItems={'flex-start'}
        >
          <Box w={'full'} position={'relative'}>
            <Element
              questionCode={questionCode}
              regexPattern={regexPattern}
              errorMessage={errorMessage}
              parentCode={parentCode}
              placeholderName={
                index === 0 ? placeholderName : secondPlaceholderName || placeholderName
              }
              attributeCode={attributeCode}
              targetCode={targetCode}
              mandatory={mandatory}
              clientId={clientId}
              data={makeChildData(value)}
              repeated={`${index}`}
              onSendAnswer={onUpdateValue(index)}
            />
            {((mandatory && index !== 0) || !mandatory) && (
              <Button
                onClick={() => onRemove(index)}
                bg={'transparent'}
                color="product.secondary"
                position={'absolute'}
                right="-2.75rem"
                {...propMap}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            )}
          </Box>
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
