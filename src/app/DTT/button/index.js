import { Box, Button } from '@chakra-ui/react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Submit from './Submit'
import { onSendMessage } from 'vertx'

const EventButton = ({ askData, onFinish, parentCode }) => {
  const { questionCode, targetCode, name, disabled } = askData

  const onClick = () =>
    onSendMessage({
      code: questionCode,
      rootCode: parentCode,
      parentCode,
      targetCode,
      value: true,
    })

  if (name === 'Submit')
    return <Submit askData={askData} onFinish={onFinish} parentCode={parentCode} />

  return (
    <Box>
      <Button
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
        borderRadius={`9999px`}
        paddingBlock="6px"
        paddingInline="20px"
        background={'primary.900'}
        _hover={{
          background: 'primary.500',
        }}
      >
        {name}
      </Button>
    </Box>
  )
}

export default EventButton
