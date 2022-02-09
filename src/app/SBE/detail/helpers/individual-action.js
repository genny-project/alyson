import { IconButton, MenuItem } from '@chakra-ui/react'
import Button from 'app/layouts/components/button'

import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IndividualAction = ({ parentCode, targetCode, code, noMenu, icon, customAction, name }) => {
  const data = useSelector(selectCode(parentCode, code))

  if (!data) return null

  const { attributeName } = data

  const handleClick = (code, data) => {
    onSendMessage({
      parentCode,
      code,
      targetCode,
    })
  }

  return (
    <Button
      colorScheme="primary"
      leftIcon={<FontAwesomeIcon icon={icon} />}
      test-id={code}
      onClick={() => handleClick(code, data)}
      borderRadius="2rem"
    >
      {attributeName}
    </Button>
  )
}

export default IndividualAction
