import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text } from '@chakra-ui/react'
import { onSendMessage } from 'vertx'

const Action = ({ parentCode, code, targetCode, size = 'xs' }) => {
  const data = useSelector(selectCode(parentCode, code))

  if (!data) return null

  const handleClick = () =>
    onSendMessage({
      parentCode,
      code,
      targetCode,
    })

  return (
    <Text onClick={handleClick} size={size}>
      {data.attributeName}
    </Text>
  )
}

export default Action
