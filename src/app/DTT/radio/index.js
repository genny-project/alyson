import { Radio as CRadio, RadioGroup, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { Read } from 'app/DTT/text'

const Write = ({ value, onSendAnswer, groupCode }) => {
  const options = useSelector(selectRows(groupCode))
  const optionData = useSelector(selectCodes(options, 'PRI_NAME'))

  return (
    <RadioGroup test-id={groupCode} value={value} onChange={onSendAnswer}>
      <Stack direction="row">
        {optionData.map(
          option =>
            option && (
              <CRadio
                key={option.baseEntityCode}
                test-id={option.baseEntityCode}
                value={option.baseEntityCode}
              >
                {option.value}
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
