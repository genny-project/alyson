import { Button, useTheme } from '@chakra-ui/react'
import { equals, includes } from 'ramda'

import isSubmitButton from 'app/DTT/event_button/helpers/is-submit.js'
import { isString } from 'utils/helpers/is-type.ts'
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

  if (!questionCode && !isString(questionCode)) {
    return null
  }

  const buttonVariant = includes('_PREVIOUS', questionCode) ? 'outline' : 'solid'
  const isOutlineButton = equals(buttonVariant, 'outline')

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
        buttonVariant={buttonVariant}
        isOutlineButton={isOutlineButton}
      />
    )
  return (
    <Button
      test-id={questionCode}
      isDisabled={disabled}
      onClick={onClick}
      variant={buttonVariant}
      bg={
        isProductIM && isOutlineButton
          ? 'transparent'
          : isProductIM
          ? `${realm}.secondary`
          : 'theme.colors.background.light'
      }
      borderWidth="1px"
      borderStyle={'solid'}
      borderColor={isProductIM ? `${realm}.secondary` : buttonBackgroundColor}
      borderRadius={'full'}
      paddingInline={isProductIM ? 6 : 4}
      // w={'6.5rem'}
      fontSize={'sm'}
      fontWeight={isProductIM ? 400 : 600}
      fontStyle={'italic'}
      color={
        isProductIM && isOutlineButton
          ? `${realm}.secondary`
          : isProductIM
          ? `${realm}.light`
          : buttonBackgroundColor
      }
      mr={2}
      marginBlock="5"
      cursor="pointer"
      _hover={{
        variant: buttonVariant,
        background:
          isProductIM && isOutlineButton
            ? `${realm}.secondary`
            : isProductIM
            ? `${realm}.primary400`
            : buttonBackgroundColor,
        color:
          isProductIM && isOutlineButton
            ? `${realm}.light`
            : isProductIM
            ? `${realm}.primary`
            : theme.colors.text.dark,
        borderColor: isProductIM ? `${realm}.primary` : buttonBackgroundColor,
        boxShadow: '0 .25rem .5rem rgb(0 0 0 / .15)',
      }}
      {...config}
      _disabled={{
        bg: isProductIM ? `${realm}.neutralGray` : buttonBackgroundColor,
        borderColor: isProductIM ? `${realm}.neutralGray` : buttonBackgroundColor,
        pointerEvents: 'none',
        opacity: isProductIM ? 1 : '0.4',
        color: isProductIM ? `${realm}.light` : theme.colors.text.dark,
      }}
      _active={{
        background:
          isProductIM && isOutlineButton
            ? `${realm}.secondary`
            : isProductIM
            ? `${realm}.primary400`
            : buttonBackgroundColor,
        borderColor:
          isProductIM && isOutlineButton
            ? `${realm}.secondary`
            : isProductIM
            ? `${realm}.primary400`
            : buttonBackgroundColor,
        color:
          isProductIM && isOutlineButton
            ? `${realm}.light`
            : isProductIM
            ? `${realm}.primary`
            : theme.colors.text.dark,
      }}
    >
      {name}
    </Button>
  )
}

export default EventButton
