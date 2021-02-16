import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'

const EventButton = ({ askData, onFinish, parentCode }) => {
  const { questionCode, targetCode, name, disabled } = askData

  const onClick = () => {
    onSendMessage({
      code: questionCode,
      rootCode: parentCode,
      parentCode,
      targetCode,
      value: true,
    })
    if (questionCode === 'QUE_SUBMIT' && typeof onFinish === 'function') onFinish()
  }

  return (
    <Button
      test-id={questionCode}
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
