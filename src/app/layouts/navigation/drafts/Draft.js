import { MenuItem } from '@chakra-ui/menu'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Draft = ({ code, parentCode, recipientCodeArray = [] }) => {
  const draft = useSelector(selectCode(parentCode, code))

  if (!draft) return null
  return (
    <MenuItem
      fontSize={'sm'}
      onClick={() =>
        onSendMessage({
          code,
          parentCode,
          recipientCodeArray,
        })
      }
    >
      {draft?.name || 'Untitled Draft'}
    </MenuItem>
  )
}

export default Draft
