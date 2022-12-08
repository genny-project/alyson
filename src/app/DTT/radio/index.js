import { Radio as CRadio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { compose, equals, includes, map, split } from 'ramda'

import { Read as TextRead } from 'app/DTT/text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectCode } from 'redux/db/selectors'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import isNullOrUndefined from 'utils/helpers/is-null-or-undefined'

const Read = ({ data, boolean }) => {
  const labels = split(';')(data?.html?.labels || 'Yes;No')
  const name = useSelector(selectCode(data?.attributeCode, 'attributeName')) || ''

  if (boolean) {
    return <TextRead data={data} />
  }

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

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  groupCode,
  parentCode,
  placeholderName,
  html,
  mandatory,
  boolean,
}) => {
  const labels = split(';')(html?.labels || 'Yes;No')
  const vertical = html?.vertical || false

  const selectedRadioData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []

  const selectedOptions = compose(map(({ code, name }) => ({ label: name, value: code })))(
    selectedRadioData,
  )
  const booleanOptions = [
    { label: labels[0], value: true },
    { label: labels[1], value: false },
  ]

  const options = boolean ? booleanOptions : selectedOptions

  // This checks if it is an Stringified Array
  const arrayValue = includes('[', data?.value || '') ? safelyParseJson(data?.value, []) : []

  const [value, setValue] = useState(arrayValue.length ? arrayValue[0] : data?.value || null)

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const onChange = value => {
    const newValue = boolean ? equals(value)('true') : value
    setValue(newValue)
    onSendAnswer(boolean ? newValue : [newValue])
    dispatchFieldMessage({ payload: questionCode })
  }
  return (
    <Stack
      ml={1}
      direction={vertical || options?.length || 0 > 2 ? 'column' : 'row'} // just making sure that longer sets of options don't end up weirdly arranged
      spacing={5}
      justifyContent={vertical || options?.length || 0 ? 'flex-start' : 'space-between'}
    >
      <Text as="label" color="gray.700">
        {placeholderName}
        {mandatory && (
          <Text as="span" color={'red.500'} ml={1}>
            *
          </Text>
        )}
      </Text>
      <RadioGroup value={value} onChange={onChange}>
        <Stack direction={vertical ? 'column' : 'row'}>
          {options &&
            map(
              option =>
                option && (
                  <CRadio
                    id={questionCode}
                    key={`${option.value}`}
                    test-id={`${option.value}-${parentCode}`}
                    value={option.value}
                  >
                    {`${option.label}`}
                  </CRadio>
                ),
            )(options)}
        </Stack>
      </RadioGroup>
    </Stack>
  )
}

const Radio = {
  Write,
  Read,
}

export default Radio
