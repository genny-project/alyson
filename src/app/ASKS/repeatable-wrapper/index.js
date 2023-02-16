import { Button, HStack, VStack, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lensProp, set, assoc, append, remove, compose, adjust, length } from 'ramda'
import { useState } from 'react'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
  ...props
}) => {
  const [values, setValues] = useState(safelyParseJson(data?.value || '[]'))

  const makeChildData = value => set(lensProp('value'), value)(data)

  const onUpdateValue = index => value => {
    setValues(adjust(index, () => value, values))
  }
  const makeChildProps = value => index =>
    compose(
      assoc('onSendAnswer', answer => onUpdateValue(index)(answer)),
      assoc('data', makeChildData(value)),
    )(childProps)

  const onRemove = index => {
    setValues(remove(index, 1, values))
  }
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
      {makeChildComponents(values)}
      <Box>{length(values) < 9 && <Button onClick={onAddAnother}>Add Another</Button>}</Box>
    </VStack>
  )
}

const ChildWrapper = ({ generatorFunction, index, onRemove }) => {
  return (
    <HStack>
      <Box width="full">{generatorFunction()}</Box>
      <Button onClick={() => onRemove(index)}>
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </Button>
    </HStack>
  )
}

export default RepeatableWrapper
