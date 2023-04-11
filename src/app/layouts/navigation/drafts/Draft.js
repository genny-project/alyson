import { MenuItem } from '@chakra-ui/menu'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const NotificationHandler = ({ code, parentCode, sourceCode = '', targetCode = '' }) => {
  const notification = useSelector(selectCode(parentCode, code))

  if (!notification) return null
  return (
    <MenuItem
      fontSize={'sm'}
      onClick={() =>
        onSendMessage({
          code,
          parentCode,
          sourceCode,
          targetCode,
        })
      }
    >
      {notification?.name || 'Untitled Draft'}
    </MenuItem>
  )
}

export default NotificationHandler
