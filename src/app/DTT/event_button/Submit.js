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
        mb="5"
        background={isProductIM ? `${realm}.secondary` : buttonBackgroundColor}
        borderRadius={'0.5rem'}
        fontSize={'sm'}
        fontWeight={isProductIM ? 400 : 600}
        color={theme.colors.text.dark}
        _hover={{
          background: isProductIM ? `${realm}.primaryLight` : theme.colors.background.light,
          color: isProductIM ? `${realm}.primary` : buttonBackgroundColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isProductIM ? `${realm}.primaryLight` : buttonBackgroundColor,
          variant: 'outline',
        }}
        _disabled={{
          pointerEvents: 'none',
          opacity: '0.4',
        }}
      >
        {name}
      </Button>
    </>
  )
}

export default Submit
