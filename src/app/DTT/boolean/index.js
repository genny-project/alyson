import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { equals, split } from 'ramda'
import { useState } from 'react'

const Read = ({ data }) => {
  if (!data?.value) return null

  return <Text>{data?.value}</Text>
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
