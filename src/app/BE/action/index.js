import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Button } from '@chakra-ui/react'
import { onSendMessage } from 'vertx'

const Action = ({ parentCode, code, targetCode }) => {
  const data = useSelector(selectCode(parentCode, code))

  if (!data) return null

  const handleClick = () =>
    onSendMessage({
      parentCode,
      code,
      targetCode,
    })

  return (
    <Button onClick={handleClick} size="xs">
      {data.attributeName}
    </Button>
  )
}

export default Action
