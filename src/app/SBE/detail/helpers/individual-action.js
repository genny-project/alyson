import Button from 'app/layouts/components/button'

import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import { getIconsBasedOnAttributes } from 'app/SBE/detail/helpers/get-icons-based-on-attributes.js'

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
      leftIcon={getIconsBasedOnAttributes(code)}
      test-id={code}
      onClick={() => handleClick(code, data)}
      borderRadius="2rem"
    >
      {attributeName}
    </Button>
  )
}

export default IndividualAction
