import { Radio as CRadio, RadioGroup, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Read } from 'app/DTT/text'

const Write = ({ questionCode, data, onSendAnswer, groupCode }) => {
  const options = useSelector(selectCode(groupCode))

  const value = data?.value

  return (
    <RadioGroup test-id={questionCode} value={value} onChange={onSendAnswer}>
      <Stack test-id={groupCode} direction="row">
        {options.map(
          option =>
            option && (
              <CRadio key={option.code} test-id={option.code} value={option.code}>
                {option.name}
              </CRadio>
            ),
        )}
      </Stack>
    </RadioGroup>
  )
}

const Radio = {
  Write,
  Read,
}

export default Radio
