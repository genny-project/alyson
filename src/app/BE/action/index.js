import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Button, IconButton, MenuItem } from '@chakra-ui/react'
import { onSendMessage } from 'vertx'

const Action = ({
  parentCode,
  code,
  targetCode,
  size = 'xs',
  mobile,
  colorScheme,
  isFullWidth,
  icon,
}) => {
  const data = useSelector(selectCode(parentCode, code))

  if (!data) return null

  const handleClick = () =>
    onSendMessage({
      parentCode,
      code,
      targetCode,
    })

  if (icon)
    return (
      <IconButton
        size={size}
        colorScheme={colorScheme}
        onClick={handleClick}
        test-id={code}
        icon={icon}
      />
    )

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
