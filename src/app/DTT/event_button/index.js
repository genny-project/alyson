import { Button, useTheme } from '@chakra-ui/react'

import Submit from './Submit'
import isSubmitButton from 'app/DTT/event_button/helpers/is-submit.js'
import { onSendMessage } from 'vertx'
import useProductColors from 'utils/productColors'

const EventButton = ({ askData, onFinish, parentCode, sourceCode, clientId }) => {
  const { questionCode, targetCode, name, disabled, processId, attributeCode } = askData
  const theme = useTheme()

  const { buttonBackgroundColor } = useProductColors()

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
      borderWidth="1px"
      borderStyle={'solid'}
      borderColor={buttonBackgroundColor}
      w={`6.5rem`}
      fontSize={'sm'}
      color={buttonBackgroundColor}
      mr={2}
      mb="5"
      _hover={{
        variant: 'solid',
        background: buttonBackgroundColor,
        color: theme.colors.text.dark,
      }}
    >
      {name}
    </Button>
  )
}

export default EventButton
