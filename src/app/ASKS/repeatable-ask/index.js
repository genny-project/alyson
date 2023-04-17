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
import { getAsArray } from 'utils/helpers/get_as_array'

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
  processId,
  dataType,
  maxOptions = 10,
  firstWidth = '100%',
  extraWidth = '100%',
  deleteTop = true,
  emptyValue = '',
  addButtonFirstText = 'Add New',
  addButtonAnotherText = 'Add Another',
  secondPlaceholderName = '',
  centerDeleteButton = false,
  showEmptyValueOnLoad = false,
}) => {
  const defaultValue = mandatory || showEmptyValueOnLoad ? `${emptyValue}` : ''
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

  const showDeleteButton = index => (mandatory && index !== 0) || !mandatory

  const Element = component
  let mapValues = getAsArray(values || [])
  return (
    <VStack w="100%" justifyItems="flex-start" alignItems="flex-start" spacing={5}>
      {mapValues.map((value, index) => (
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
              processId={processId}
              targetCode={targetCode}
              dataType={dataType}
              mandatory={mandatory}
              clientId={clientId}
              data={makeChildData(value)}
              repeated={`${index}`}
              onSendAnswer={onUpdateValue(index)}
            />
            {showDeleteButton(index) && centerDeleteButton && (
              <VStack
                position={'absolute'}
                right="-2.75rem"
                top="0"
                height={'100%'}
                justifyContent={'center'}
              >
                <Button
                  onClick={() => onRemove(index)}
                  bg={'transparent'}
                  color="product.secondary"
                  {...propMap}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </VStack>
            )}
            {showDeleteButton(index) && !centerDeleteButton && (
              <Button
                onClick={() => onRemove(index)}
                bg={'transparent'}
                color="product.secondary"
                right="-2.75rem"
                position={'absolute'}
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
        bg={'transparent'}
        onClick={onAddAnother}
        color={'product.secondary'}
        border={'solid 2px'}
        borderRadius={'3xl'}
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
