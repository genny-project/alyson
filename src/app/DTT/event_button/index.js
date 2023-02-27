import { Button, useTheme } from '@chakra-ui/react'

import isSubmitButton from 'app/DTT/event_button/helpers/is-submit.js'
import { equals } from 'ramda'
import { internmatch } from 'utils/constants'
import useGetProductName from 'utils/helpers/get-product-name'
import useProductColors from 'utils/productColors'
import { onSendMessage } from 'vertx'
import Submit from './Submit'

const EventButton = ({ askData, onFinish, parentCode, sourceCode, config }) => {
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
      <Submit
        askData={askData}
        onFinish={onFinish}
        parentCode={parentCode}
        realm={realm}
        isProductIM={isProductIM}
      />
    )

  return (
    <Button
      test-id={questionCode}
      isDisabled={disabled}
      onClick={onClick}
      variant="solid"
      bg={isProductIM ? `${realm}.primary400` : 'theme.colors.background.light'}
      borderWidth="1px"
      borderStyle={'solid'}
      borderColor={isProductIM ? `${realm}.primary` : buttonBackgroundColor}
      borderRadius={'full'}
      paddingInline={isProductIM ? 6 : 4}
      // w={'6.5rem'}
      fontSize={'sm'}
      fontWeight={isProductIM ? 400 : 600}
      color={isProductIM ? `${realm}.primary` : buttonBackgroundColor}
      mr={2}
      marginBlock="5"
      cursor="pointer"
      _hover={{
        variant: 'solid',
        background: isProductIM ? `${realm}.primary` : buttonBackgroundColor,
        color: isProductIM ? `${realm}.light` : theme.colors.text.dark,
        boxShadow: '0 .25rem .5rem rgb(0 0 0 / .5)',
      }}
      {...config}
      _disabled={{
        bg: isProductIM ? `${realm}.neutralGray` : buttonBackgroundColor,
        borderColor: isProductIM ? `${realm}.neutralGray` : buttonBackgroundColor,
        pointerEvents: 'none',
        opacity: isProductIM ? 1 : '0.4',
      }}
      _active={{
        variant: 'solid',
        background: isProductIM ? `${realm}.primary` : buttonBackgroundColor,
        color: isProductIM ? `${realm}.light` : theme.colors.text.dark,
      }}
    >
      {name}
    </Button>
  )
}

export default EventButton
