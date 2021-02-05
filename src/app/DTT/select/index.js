import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { Read } from 'app/DTT/text'
import { Select as CSelect } from '@chakra-ui/react'

const Write = ({ placeholder, onSendAnswer, groupCode }) => {
  const options = useSelector(selectRows(groupCode))
  const optionData = useSelector(selectCodes(options, 'PRI_NAME'))

  return (
    <CSelect
      placeholder={placeholder}
      test-id={groupCode}
      onChange={e => onSendAnswer(e.target.value)}
    >
      {optionData &&
        optionData.map(
          option => option && <option value={option.baseEntityCode}>{option.value}</option>,
        )}
    </CSelect>
  )
}

const Select = {
  Write,
  Read,
}

export default Select
