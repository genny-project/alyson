import { Radio as CRadio, RadioGroup, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Read } from 'app/DTT/text'
import { map, compose } from 'ramda'

const Write = ({ questionCode, data, onSendAnswer, groupCode, parentCode }) => {
  const radioData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(radioData)

  const value = data?.value ? data.value : null

  return (
    <RadioGroup test-id={questionCode} value={value} onChange={onSendAnswer}>
      <Stack test-id={groupCode} direction="row">
        {options &&
          map(
            option =>
              option && (
                <CRadio key={option.value} test-id={option.value} value={option.value}>
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
