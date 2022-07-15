import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { MenuItem } from '@chakra-ui/react'

const ChildMenuItem = ({ onClose, questionCode, childCode, rootCode, targetCode }) => {
  const data = useSelector(selectCode(questionCode, childCode))
  const processId = useSelector(selectCode(questionCode, 'processId'))

  if (!data) return null

  const { name } = data

  const onClick = () => {
    sendEvtClick({
      parentCode: questionCode,
      code: childCode,
      sourceCode: rootCode,
      targetCode: targetCode,
      processId: processId,
    })
    typeof onClose === 'function' && onClose()
  }

  return (
    <MenuItem test-id={childCode} onClick={onClick} color="#000000">
      {name}
    </MenuItem>
  )
}

export default ChildMenuItem
