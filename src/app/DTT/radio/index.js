import { Radio as CRadio, RadioGroup, Stack } from '@chakra-ui/react'
import { compose, includes, map } from 'ramda'

import { Read } from 'app/DTT/text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectCode } from 'redux/db/selectors'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useSelector } from 'react-redux'

const Write = ({ questionCode, data, onSendAnswer, groupCode, parentCode }) => {
  const radioData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(radioData)

  // This checks if it is an Stringified Array
  const arrayValue = includes('[', data?.value || '') ? safelyParseJson(data?.value, []) : []
  const value = arrayValue.length ? arrayValue[0] : data?.value || null

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const onChange = value => {
    onSendAnswer([value])
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <RadioGroup colorScheme="green" test-id={questionCode} value={value} onChange={onChange}>
      <Stack test-id={groupCode} direction="row">
        {options &&
          map(
            option =>
              option && (
                <CRadio
                  id={questionCode}
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
