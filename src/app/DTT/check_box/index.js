import 'app/DTT/check_box/styles.scss'
import { Checkbox as CCheckbox, Stack } from '@chakra-ui/react'
import { append, compose, equals, includes, map, path, reject } from 'ramda'
import { useEffect, useState } from 'react'
import { useIsProductInternmatch, useIsProductLojing } from 'utils/helpers/check-product-name'

import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useGetProductName from 'utils/helpers/get-product-name'
import isJson from 'utils/helpers/is-json'
import useProductColors from 'utils/productColors'
import { isArray } from 'utils/helpers/is-type'
import Select from 'app/DTT/select'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'

const Read = ({ data, dataType }) => <Select.Read data={data} dataType={dataType} />

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  parentCode,
  placeholderName,
  mandatory,
  config,
}) => {
  const realm = useGetProductName().toLowerCase()
  const isProductInternmatch = useIsProductInternmatch()
  const colorScheme = useGetAttributeFromProjectBaseEntity('PRI_SECONDARY_COLOR')?.valueString
  let dataValueFromBackend = isJson(data?.value) ? JSON.parse(data.value) : data.value || ''
  const isDataValueArray = Array.isArray(dataValueFromBackend)
  const dataValue = isDataValueArray ? path([0])(dataValueFromBackend) : dataValueFromBackend
  const isProductLojing = useIsProductLojing()
  const [value, setValue] = useState(dataValue)

  const { vertical } = config || {}
  //change default orientation for lojing while preserving config functionality
  const verticalAligned = vertical || isProductLojing ? true : false
  const selectedData =
    compose(useSelector, selectCode)(`${parentCode}-${questionCode}-options`) || []

  const options = map(({ code, name }) => ({ label: name, value: code }))(selectedData)

  const { labelTextColor } = useProductColors()

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  useEffect(() => {
    setValue(dataValue)
  }, [dataValue])

  const onChange = selectedValue => {
    let newValue = isArray(value) ? value : !!value ? [value] : []
    if (includes(selectedValue)(newValue)) {
      newValue = reject(equals(selectedValue))(newValue)
    } else {
      newValue = append(selectedValue)(newValue)
    }

    console.log(newValue)

    setValue(newValue)
    onSendAnswer(newValue)
    dispatchFieldMessage({ payload: questionCode })
  }

  const outerStackVertical = verticalAligned || (options?.length || 0) > 2

  return (
    <Stack
      ml={1}
      direction={outerStackVertical ? 'column' : 'row'} // just making sure that longer sets of options don't end up weirdly arranged
      spacing={outerStackVertical ? 0 : 1}
      justifyContent={outerStackVertical ? 'space-between' : 'flex-start'}
    >
      <MandatorySymbol
        placeholderName={placeholderName}
        mandatory={mandatory}
        labelTextColor={isProductInternmatch ? `${realm}.primary` : labelTextColor}
        realm={realm}
      />
      <Stack direction={verticalAligned ? 'row' : 'column'}>
        {options &&
          map(
            option =>
              option && (
                <CCheckbox
                  m="1"
                  id={questionCode}
                  key={`${option.value}`}
                  test-id={`${option.value}-${parentCode}`}
                  value={option.value}
                  isChecked={includes(option.value)(value || [])}
                  onChange={() => onChange(option.value)}
                  _checked={{
                    bg: isProductInternmatch ? `${realm}.secondary` : colorScheme,
                    borderColor: isProductInternmatch ? `${realm}.secondary` : colorScheme,
                  }}
                  _disabled={{
                    opacity: '.4',
                  }}
                  _groupHover={{
                    borderColor: isProductInternmatch ? `${realm}.secondary` : colorScheme,
                  }}
                >
                  {`${option.label}`}
                </CCheckbox>
              ),
          )(options)}
      </Stack>
    </Stack>
  )
}

const MultiCheckbox = {
  Write,
  Read,
}

export default MultiCheckbox
