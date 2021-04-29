import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Button, MenuItem } from '@chakra-ui/react'
import { onSendMessage } from 'vertx'

const Action = ({
  parentCode,
  code,
  targetCode,
  size = 'xs',
  mobile,
  colorScheme,
  isFullWidth,
}) => {
  const data = useSelector(selectCode(parentCode, code))

  if (!data) return null

  const handleClick = () =>
    onSendMessage({
      parentCode,
      code,
      targetCode,
    })

  return mobile ? (
    <MenuItem onClick={handleClick} test-id={code}>
      {data.attributeName}
    </MenuItem>
  ) : (
    <Button
      isFullWidth={isFullWidth}
      colorScheme={colorScheme}
      onClick={handleClick}
      size={size}
      test-id={code}
    >
      {data.attributeName}
    </Button>
  )
}

export default Action
