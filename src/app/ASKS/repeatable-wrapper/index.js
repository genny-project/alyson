import { Button, HStack, VStack, Box } from '@chakra-ui/react'
import { lensProp, set, assoc, append, remove, compose, adjust } from 'ramda'
import { useState } from 'react'
import safelyParseJson from 'utils/helpers/safely-parse-json'

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
  const makeChildData = value => set(lensProp('value'), value)(data)
  const makeChildProps = value => index =>
    compose(
      assoc('onSendAnswer', answer => onUpdateValue(index)(answer)),
      assoc('data', makeChildData(value)),
    )(childProps)
  const makeChildComponents = values =>
    values.map((value, index) => (
      <ChildWrapper
        key={`${questionCode}-${index}`}
        index={index}
        onRemove={onRemove}
        generatorFunction={() => children(makeChildProps(value)(index))}
      />
    ))
  const [values, setValues] = useState(safelyParseJson(data?.value || '[]'))
  const [childComponents, setChildComponents] = useState(makeChildComponents(values))
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

  const updateValues = newValues => {
    setValues(newValues)
    setChildComponents(makeChildComponents(newValues))
  }

  const onUpdateValue = index => value => {
    updateValues(adjust(index, () => value, values))
  }

  const onAddAnother = () => {
    updateValues(append('')(values))
  }

  const onRemove = index => {
    console.log(index)
    updateValues(remove(index, 1, values))
  }

  return (
    <VStack alignItems={'stretch'}>
      {childComponents}
      <Button onClick={onAddAnother}>Add Another</Button>
    </VStack>
  )
}

const ChildWrapper = ({ generatorFunction, index, onRemove }) => {
  return (
    <HStack>
      <Box width="full">{generatorFunction()}</Box>
      <Button onClick={() => onRemove(index)}></Button>
    </HStack>
  )
}

export default RepeatableWrapper
