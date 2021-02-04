import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { MenuItem } from '@chakra-ui/react'
import { onSendMessage } from 'vertx'

const Action = ({ parentCode, code, targetCode }) => {
  const data = useSelector(selectCode(parentCode, code))

  const handleClick = () =>
    onSendMessage({
      parentCode,
      code,
      targetCode,
    })

  return <MenuItem onClick={handleClick}>{data.attributeName}</MenuItem>
}

export default Action
