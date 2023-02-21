import { Radio as CRadio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { compose, equals, map, path, split } from 'ramda'
import { useEffect, useState } from 'react'
import { useIsProductInternmatch, useIsProductLojing } from 'utils/helpers/check-product-name'

import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useGetProductName from 'utils/helpers/get-product-name'
import isJson from 'utils/helpers/is-json'
import isNullOrUndefined from 'utils/helpers/is-null-or-undefined'
import useProductColors from 'utils/productColors'

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
  const realm = useGetProductName().toLowerCase()
  const isProductInternmatch = useIsProductInternmatch()

  let dataValueFromBackend = isJson(data?.value) ? JSON.parse(data.value) : data.value || ''
  const isDataValueArray = Array.isArray(dataValueFromBackend)
  const dataValue = isDataValueArray ? path([0])(dataValueFromBackend) : dataValueFromBackend
  const isProductLojing = useIsProductLojing()
  const [value, setValue] = useState(dataValue)

  const defaultBooleanLabel = 'Yes;No'
  const { labels: htmlLabels, vertical } = config || {}
  const labels = split(';')(htmlLabels || defaultBooleanLabel)
  //change default orientation for lojing while preserving config functionality
  const verticalAligned = vertical || isProductLojing ? true : false
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
        labelTextColor={isProductInternmatch ? `${realm}.primary` : labelTextColor}
      />
      <RadioGroup value={value} onChange={onChange}>
        <Stack direction={verticalAligned ? 'row' : 'column'}>
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
