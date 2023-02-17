import { Button, HStack, VStack, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lensProp, set, assoc, append, remove, compose, adjust, length, filter } from 'ramda'
import { useState } from 'react'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import useProductColors from 'utils/productColors'
import isNotEmpty from 'utils/helpers/is-not-empty'

const RepeatableWrapper = ({
  children,
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
}) => {
  const { borderRadius } = useProductColors()
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
  const makeChildProps = value => index =>
    compose(
      assoc('onSendAnswer', answer => onUpdateValue(index)(answer)),
      assoc('data', makeChildData(value)),
      assoc('repeated', `${index}`),
    )(childProps)

  const makeChildComponents = values =>
    values.map((value, index) => (
      <ChildWrapper
        key={`${questionCode}-${index}-${value}`}
        index={index}
        onRemove={onRemove}
        generatorFunction={() => children(makeChildProps(value)(index))}
      />
    ))

  const childProps = {
    questionCode,
    regexPattern,
    errorMessage,
    parentCode,
    placeholderName,
    attributeCode,
    targetCode,
    mandatory,
    clientId,
    skipSendAnswer: true,
  }

  const onAddAnother = () => {
    setValues(append('')(values))
  }

  return (
    <VStack alignItems={'stretch'}>
      {makeChildComponents(values || [])}
      <Box>
        {length(values) < 9 && (
          <AddButton
            onClick={onAddAnother}
            borderRadius={borderRadius}
            bg={'product.secondaryLight'}
            color={'product.secondary'}
          />
        )}
      </Box>
    </VStack>
  )
}

const AddButton = ({ onClick, borderRadius, bg, color }) => (
  <Button fontWeight={'normal'} bg={bg} borderRadius={borderRadius} onClick={onClick} color={color}>
    <Box paddingRight={3}>Add Another</Box>
    <FontAwesomeIcon icon={faPlus} />
  </Button>
)

const ChildWrapper = ({ generatorFunction, index, onRemove }) => {
  return (
    <HStack>
      <Box width="full" paddingRight={2}>
        {generatorFunction()}
      </Box>
      <Box onClick={() => onRemove(index)} cursor="pointer" color={'product.secondary'}>
        <FontAwesomeIcon transform={{ rotate: 45 }} icon={faPlus} size="lg" />
      </Box>
    </HStack>
  )
}

export default RepeatableWrapper
