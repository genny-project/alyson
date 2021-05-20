import { MenuItem } from '@chakra-ui/react'
import Button from 'app/layouts/components/button'

import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Action = ({ parentCode, code, targetCode, noMenu }) => {
  const needsToBeConfirmed = useSelector(selectCode(parentCode, code))?.confirmationFlag
  const data = useSelector(selectCode(parentCode, code))

  if (!data) return null

  const handleClick = (code, data) => {
    !!needsToBeConfirmed
      ? window.confirm(`Are you sure you want to ${data.attributeName}?`) &&
        onSendMessage({
          parentCode,
          code,
          targetCode,
        })
      : onSendMessage({
          parentCode,
          code,
          targetCode,
        })
  }

  if (noMenu)
    return (
      <Button test-id={code} onClick={() => handleClick(code, data)}>
        {data.attributeName}
      </Button>
    )

  return (
    <div>
      <MenuItem test-id={code} onClick={() => handleClick(code, data)}>
        {data.attributeName}
      </MenuItem>
    </div>
  )
}

export default Action
