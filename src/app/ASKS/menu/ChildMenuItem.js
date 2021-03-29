import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { MenuItem } from '@chakra-ui/react'

const ChildMenuItem = ({ onClose, questionCode, childCode, rootCode, targetCode }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  if (!data) return null

  const { name } = data

  const onClick = () => {
    sendAskClick(questionCode, childCode, rootCode, targetCode)
    typeof onClose === 'function' && onClose()
  }

  return (
    <MenuItem test-id={childCode} onClick={onClick}>
      {name}
    </MenuItem>
  )
}

export default ChildMenuItem
