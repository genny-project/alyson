import { Button, useTheme } from '@chakra-ui/react'

import { includes } from 'ramda'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import useProductColors from 'utils/productColors'
import { onSendMessage } from 'vertx'

const Submit = ({ askData, onFinish, parentCode, realm, isProductIM }) => {
  const { questionCode, targetCode, name, disabled: disabledFromBackEnd } = askData
  const { errorState } = useError()
  const theme = useTheme()

  const errorStateValues = Object.values(errorState)
  const hasError = includes(true)(errorStateValues)
  const isDisabled = hasError || disabledFromBackEnd
  const attrCode = useSelector(selectCode(questionCode, 'attributeCode'))

  const { buttonBackgroundColor } = useProductColors()

  const [loading, setLoading] = useState(false)

  const onClick = () => {
    onSendMessage({
      code: questionCode,
      rootCode: parentCode,
      parentCode,
      targetCode,
      attributeCode: attrCode,
      processId: askData.processId,
    })
    if (questionCode === 'QUE_SUBMIT') {
      typeof onFinish === 'function' && onFinish()
      setLoading(true)
    }
  }

  return (
    <>
      <Button
        isLoading={loading}
        test-id={questionCode}
        isDisabled={isDisabled}
        onClick={onClick}
        variant="solid"
        minW={`6.5rem`}
        paddingBlock="0.38rem"
        paddingInline="1.25rem"
        mr={2}
        marginBlock="5"
        background={isProductIM ? `${realm}.secondary` : buttonBackgroundColor}
        borderRadius={isProductIM ? 'full' : '0.5rem'}
        fontSize={'sm'}
        fontWeight={isProductIM ? 400 : 600}
        color={theme.colors.text.dark}
        _hover={{
          background: isProductIM ? `${realm}.primary400` : theme.colors.background.light,
          color: isProductIM ? `${realm}.primary` : buttonBackgroundColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isProductIM ? `${realm}.primary` : buttonBackgroundColor,
          variant: 'outline',
        }}
        _disabled={{
          bg: isProductIM ? `${realm}.neutralGray` : buttonBackgroundColor,
          borderColor: isProductIM ? `${realm}.neutralGray` : buttonBackgroundColor,
          pointerEvents: 'none',
          opacity: isProductIM ? 1 : '0.4',
          color: isProductIM ? `${realm}.light` : theme.colors.text.dark,
        }}
      >
        {name}
      </Button>
    </>
  )
}

export default Submit
