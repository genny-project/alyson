import { Radio as CRadio, RadioGroup, Stack } from '@chakra-ui/react'
import { compose, includes, isEmpty, map, not } from 'ramda'

import { Read } from 'app/DTT/text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectCode } from 'redux/db/selectors'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Write = ({ questionCode, data, onSendAnswer, groupCode, parentCode, setSaving }) => {
  const radioData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(radioData)

  // This checks if it is an Stringified Array
  const arrayValue = includes('[', data?.value || '') ? safelyParseJson(data?.value, []) : []
  const value = arrayValue.length ? arrayValue[0] : data?.value || null

  const onChangeRadio = value => {
    onSendAnswer([value])
    setSaving.on()
  }

  useEffect(() => {
    compose(not, isEmpty)(value) ? setSaving.on() : setSaving.off()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RadioGroup test-id={questionCode} value={value} onChange={onChangeRadio}>
      <Stack test-id={groupCode} direction="row">
        {options &&
          map(
            option =>
              option && (
                <CRadio
                  key={option.value}
                  test-id={`${option.value}-${parentCode}`}
                  value={option.value}
                >
                  {option.label}
                </CRadio>
              ),
          )(options)}
      </Stack>
    </RadioGroup>
  )
}

const Radio = {
  Write,
  Read,
}

export default Radio
