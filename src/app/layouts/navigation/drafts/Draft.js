import { MenuItem } from '@chakra-ui/menu'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Draft = ({ code, parentCode }) => {
  const draft = useSelector(selectCode(parentCode, code))
  console.log(draft)
  if (!draft) return null
  return (
    <MenuItem
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
