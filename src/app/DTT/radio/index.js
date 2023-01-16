import { Radio as CRadio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { compose, equals, includes, map, split } from 'ramda'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { Read as TextRead } from 'app/DTT/text'
import isNullOrUndefined from 'utils/helpers/is-null-or-undefined'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectCode } from 'redux/db/selectors'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'

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

  const { labelTextColor } = useProductColors()

  // This checks if it is an Stringified Array
  const arrayValue = includes('[', data?.value || '') ? safelyParseJson(data?.value, []) : []

  const [value, setValue] = useState(arrayValue.length ? arrayValue[0] : data?.value || null)

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const onChange = value => {
    const newValue = boolean ? equals(value)('true') : value
    setValue(newValue)
    onSendAnswer(boolean ? value : [value])
    dispatchFieldMessage({ payload: questionCode })
  }

  console.log(
    '%c 🙀🙀🙀🙀🙀🙀 Testing 🙀🙀🙀🙀🙀🙀🙀 ',
    'background: silver; color: black; padding: 0.5rem',
    {
      labels,
      vertical,
      selectedRadioData,
      selectedOptions,
      booleanOptions,
      options,
      arrayValue,
      value,
    },
  )

  return (
    <Stack
      ml={1}
      direction={vertical || options?.length || 0 > 2 ? 'row' : 'column'} // just making sure that longer sets of options don't end up weirdly arranged
      spacing={0}
      justifyContent={vertical || options?.length || 0 ? 'space-between' : 'flex-start'}
    >
      <MandatorySymbol
        placeholderName={placeholderName}
        mandatory={mandatory}
        labelTextColor={labelTextColor}
      />
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
