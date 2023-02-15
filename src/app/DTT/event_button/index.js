import { Button, useTheme } from '@chakra-ui/react'

import isSubmitButton from 'app/DTT/event_button/helpers/is-submit.js'
import { equals } from 'ramda'
import { internmatch } from 'utils/constants'
import useGetProductName from 'utils/helpers/get-product-name'
import useProductColors from 'utils/productColors'
import { onSendMessage } from 'vertx'
import Submit from './Submit'

const EventButton = ({ askData, onFinish, parentCode, sourceCode, clientId, config }) => {
  const { questionCode, targetCode, name, disabled, processId, attributeCode } = askData
  const theme = useTheme()

  const productName = useGetProductName()
  const realm = productName.toLocaleLowerCase()
  const isProductIM = equals(productName, internmatch)

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
      variant="solid"
      bg={isProductIM ? `${realm}.secondary` : 'theme.colors.background.light'}
      borderWidth="1px"
      borderStyle={'solid'}
      borderColor={isProductIM ? `${realm}.secondary` : buttonBackgroundColor}
      borderRadius={'full'}
      paddingInline={isProductIM ? 6 : 4}
      // w={'6.5rem'}
      fontSize={'sm'}
      color={isProductIM ? `${realm}.light` : buttonBackgroundColor}
      mr={2}
      marginBlock="5"
      _hover={{
        variant: 'solid',
        background: isProductIM ? `${realm}.primaryLight` : buttonBackgroundColor,
        borderColor: isProductIM ? `${realm}.primaryLight` : buttonBackgroundColor,
        color: isProductIM ? `${realm}.primary` : theme.colors.text.dark,
      }}
      {...config}
      _disabled={{
        pointerEvents: 'none',
        opacity: '0.4',
      }}
    >
      {name}
    </Button>
  )
}

export default EventButton
