import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'

const EventButton = ({ askData, onFinish }) => {
  const { questionCode, targetCode, name, disabled } = askData

  const onClick = () => {
    onSendMessage({
      code: questionCode,
      rootCode: questionCode,
      parentCode: questionCode,
      targetCode,
      value: true,
    })
    if (questionCode === 'QUE_SUBMIT' && typeof onFinish === 'function') onFinish()
  }

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
