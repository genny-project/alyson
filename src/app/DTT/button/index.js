import { Box, Button, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import { useState } from 'react'

const EventButton = ({ askData, onFinish, parentCode }) => {
  const { questionCode, targetCode, name, disabled } = askData

  const [loading, setLoading] = useState(false)

  const onClick = () => {
    onSendMessage({
      code: questionCode,
      rootCode: parentCode,
      parentCode,
      targetCode,
      value: true,
    })
    if (questionCode === 'QUE_SUBMIT') {
      typeof onFinish === 'function' && onFinish()
      setLoading(true)
    }
  }

  return (
    <Box>
      {disabled && name === 'Submit' && (
        <Text textStyle="body.error">Please complete all questions marked as mandatory with *</Text>
      )}
      <Button
        isLoading={loading}
        test-id={questionCode}
        isDisabled={disabled}
        onClick={onClick}
        leftIcon={
          questionCode === 'QUE_SUBMIT_NO' ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )
        }
        colorScheme={questionCode === 'QUE_SUBMIT_NO' ? 'red' : 'primary'}
        variant="solid"
      >
        {name}
      </Button>
    </Box>
  )
}

export default EventButton
