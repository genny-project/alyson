import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { equals, split } from 'ramda'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import isNullOrUndefined from 'utils/helpers/is-null-or-undefined'

const Read = ({ data }) => {
  const labels = split(';')(data?.html?.labels || 'Yes;No')
  const name = useSelector(selectCode(data?.attributeCode, 'attributeName')) || ''
  if (isNullOrUndefined(data?.value)) {
    return null
  }

  return (
    <Stack ml={1} direction={'row'} spacing={5} justifyContent={'flex-start'}>
      <Text as="label" color="gray.700">
        {name}
      </Text>
      <Text>{labels[data?.value ? 0 : 1]}</Text>
    </Stack>
  )
}

const Write = ({ questionCode, data, onSendAnswer, placeholderName, html, isRequired }) => {
  const labels = split(';')(html?.labels || 'Yes;No')
  const vertical = html?.vertical || false
  const [value, setValue] = useState(data?.value)
  const onChange = value => {
    const newValue = equals(value)('true')
    onSendAnswer(newValue)
    setValue(newValue)
  }

  return (
    <Stack
      ml={1}
      direction={vertical ? 'column' : 'row'}
      spacing={5}
      justifyContent={vertical ? 'flex-start' : 'space-between'}
    >
      <Text as="label" color="gray.700">
        {placeholderName}
        {isRequired && (
          <Text as="span" color={'red.500'} ml={1}>
            *
          </Text>
        )}
      </Text>
      <RadioGroup value={value} onChange={onChange}>
        <Stack direction={vertical ? 'column' : 'row'}>
          <Radio value={true}>{labels[0]}</Radio>
          <Radio value={false}>{labels[1]}</Radio>
        </Stack>
      </RadioGroup>
    </Stack>
  )
}

const Boolean = {
  Read,
  Write,
}

export default Boolean
