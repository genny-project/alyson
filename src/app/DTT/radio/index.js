import { useState, useEffect } from 'react'
import { Radio as CRadio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { compose, equals, map, path, split } from 'ramda'
import { useSelector } from 'react-redux'

import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import isJson from 'utils/helpers/is-json'
import isNullOrUndefined from 'utils/helpers/is-null-or-undefined'
import { selectCode } from 'redux/db/selectors'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import { isArray } from 'utils/helpers/is-type'

const Read = ({ data, boolean }) => {
  const labels = split(';')(data?.html?.labels || 'Yes;No')
  const name = useSelector(selectCode(data?.attributeCode, 'attributeName')) || ''

  const dataValue = data?.value
  const displayDataValue = equals(dataValue)(true)
    ? 'Yes'
    : equals(dataValue)(false)
    ? 'No'
    : dataValue

  if (boolean) {
    return <Text>{displayDataValue}</Text>
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
  config,
}) => {
  let dataValueFromBackend = isJson(data?.value) ? JSON.parse(data.value) : data.value || ''
  const isDataValueArray = isArray(dataValueFromBackend)
  const dataValue = isDataValueArray ? path([0])(dataValueFromBackend) : dataValueFromBackend

  const [value, setValue] = useState(dataValue)

  const defaultBooleanLabel = 'Yes;No'
  const { labels: htmlLabels, vertical } = config || {}
  const labels = split(';')(htmlLabels || defaultBooleanLabel)
  const verticalAligned = vertical || false
  const selectedRadioData =
    compose(useSelector, selectCode)(`${parentCode}-${questionCode}-options`) || []

  const selectedOptions = map(({ code, name }) => ({ label: name, value: code }))(selectedRadioData)
  const booleanOptions = [
    { label: labels[0], value: true },
    { label: labels[1], value: false },
  ]
  const options = boolean ? booleanOptions : selectedOptions

  const { labelTextColor } = useProductColors()

  // This checks if it is an Stringified Array

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  useEffect(() => {
    setValue(dataValue)
  }, [dataValue])

  const onChange = value => {
    const newValue = boolean ? equals(value)('true') : value
    setValue(newValue)
    onSendAnswer(boolean ? value : [value])
    dispatchFieldMessage({ payload: questionCode })
  }

  const outerStackVertical = verticalAligned || (options?.length || 0) > 2

  return (
    <Stack
      ml={1}
      direction={outerStackVertical ? 'row' : 'column'} // just making sure that longer sets of options don't end up weirdly arranged
      spacing={outerStackVertical ? 0 : 1}
      justifyContent={outerStackVertical ? 'space-between' : 'flex-start'}
    >
      <MandatorySymbol
        placeholderName={placeholderName}
        mandatory={mandatory}
        labelTextColor={labelTextColor}
      />
      <RadioGroup value={value} onChange={onChange}>
        <Stack direction={verticalAligned ? 'column' : 'row'}>
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
