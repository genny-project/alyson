import { Box, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Submit from './Submit'
import isSubmitButton from 'app/DTT/event_button/helpers/is-submit.js'

const EventButton = ({ askData, onFinish, parentCode, sourceCode }) => {
  const { questionCode, targetCode, name, disabled, processId, attributeCode } = askData

  const onClick = () =>
    onSendMessage({
      code: questionCode,
      parentCode,
      targetCode,
      value: true,
      attributeCode: attributeCode,
      processId: processId,
      sourceCode,
    })

  if (isSubmitButton(name))
    return <Submit askData={askData} onFinish={onFinish} parentCode={parentCode} />

  return (
    <Box>
      <Button
        test-id={questionCode}
        isDisabled={disabled}
        onClick={onClick}
        leftIcon={<FontAwesomeIcon icon={faCheck} />}
        colorScheme="primary"
        variant="solid"
      >
        {name}
      </Button>
    </Box>
  )
}

export default EventButton
