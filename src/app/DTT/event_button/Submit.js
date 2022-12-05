import { Button, useTheme } from '@chakra-ui/react'
import { includes } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

import { onSendMessage } from 'vertx'
import { useError } from 'utils/contexts/ErrorContext'
import useProductColors from 'utils/productColors'
import { useState } from 'react'

const Submit = ({ askData, onFinish, parentCode, clientId }) => {
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
      background={buttonBackgroundColor}
      borderRadius={'0.5rem'}
      fontSize={'sm'}
      color={theme.colors.text.dark}
      _hover={{
        background: theme.colors.background.light,
        color: buttonBackgroundColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: buttonBackgroundColor,
        variant: 'outline',
      }}
    >
      {name}
    </Button>
  )
}

export default Submit
