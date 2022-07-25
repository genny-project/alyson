import { MenuItem } from '@chakra-ui/menu'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Draft = ({ code, parentCode }) => {
  const draft = useSelector(selectCode(parentCode, code))
  if (!draft) return null
  return (
    <MenuItem
      fontSize={'sm'}
      onClick={() =>
        onSendMessage({
          code,
          parentCode,
        })
      }
    >
      {draft?.name || 'Untitled Draft'}
    </MenuItem>
  )
}

export default Draft
