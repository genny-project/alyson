import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'

const EventButton = ({ askData }) => {
  const { questionCode, targetCode, name, disabled } = askData

  console.log(disabled)

  const onClick = () =>
    onSendMessage({
      code: questionCode,
      rootCode: questionCode,
      parentCode: questionCode,
      targetCode,
      value: true,
    })
  return (
    <Button
      isDisabled={disabled}
      onClick={onClick}
      leftIcon={<FontAwesomeIcon icon={faCheck} />}
      colorScheme="teal"
      variant="solid"
    >
      {name}
    </Button>
  )
}

export default EventButton
