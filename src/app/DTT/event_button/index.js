import { Button, useTheme } from '@chakra-ui/react'

import Submit from './Submit'
import { equals } from 'ramda'
import isSubmitButton from 'app/DTT/event_button/helpers/is-submit.js'
import { lojing } from 'utils/constants'
import { onSendMessage } from 'vertx'

const EventButton = ({ askData, onFinish, parentCode, sourceCode, clientId }) => {
  const { questionCode, targetCode, name, disabled, processId, attributeCode } = askData
  const theme = useTheme()
  const bgColor = equals(clientId)(lojing) ? 'product.secondary' : 'product.primary'

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
    return (
      <Submit askData={askData} onFinish={onFinish} parentCode={parentCode} clientId={clientId} />
    )

  return (
    <Button
      test-id={questionCode}
      isDisabled={disabled}
      onClick={onClick}
      variant="outline"
      bg={theme.colors.background.light}
      border="1px solid"
      borderColor={bgColor}
      w={`6.5rem`}
      fontSize={'sm'}
      color={bgColor}
      mr={2}
      mb="5"
      _hover={{
        variant: 'solid',
        background: bgColor,
        color: theme.colors.text.dark,
      }}
    >
      {name}
    </Button>
  )
}

export default EventButton
