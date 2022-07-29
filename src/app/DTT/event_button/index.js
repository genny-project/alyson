import { Button, useTheme } from '@chakra-ui/react'

import Submit from './Submit'
import isSubmitButton from 'app/DTT/event_button/helpers/is-submit.js'
import { onSendMessage } from 'vertx'

const EventButton = ({ askData, onFinish, parentCode, sourceCode }) => {
  const { questionCode, targetCode, name, disabled, processId, attributeCode } = askData
  const theme = useTheme()

  const onClick = () =>
    onSendMessage({
      code: questionCode,
      parentCode,
      targetCode,
      value: 'TRUE',
      attributeCode: attributeCode,
      processId: processId,
      sourceCode,
    })

  if (isSubmitButton(name))
    return <Submit askData={askData} onFinish={onFinish} parentCode={parentCode} />

  return (
    <Button
      test-id={questionCode}
      isDisabled={disabled}
      onClick={onClick}
      variant="outline"
      bg={theme.colors.background.light}
      border="1px solid"
      borderColor="product.secondary"
      w={`6.5rem`}
      fontSize={'sm'}
      color="product.secondary"
      mr={2}
      _hover={{
        variant: 'solid',
        background: 'product.secondary',
        color: theme.colors.text.dark,
      }}
    >
      {name}
    </Button>
  )
}

export default EventButton
