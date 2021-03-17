import { Radio as CRadio, RadioGroup, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { Read } from 'app/DTT/text'
import { includes } from 'ramda'

const Write = ({ questionCode, data, onSendAnswer, groupCode }) => {
  const options = useSelector(selectRows(groupCode))
  const optionData = useSelector(selectCodes(options, 'PRI_NAME'))

  const value = data?.value

  return (
    <RadioGroup test-id={questionCode} value={value} onChange={onSendAnswer}>
      <Stack test-id={groupCode} direction="row">
        {optionData.map(
          option =>
            option &&
            !includes('GRP_', option.baseEntityCode) && (
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
