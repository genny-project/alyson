import { Box, Input, Text, useClipboard, useToast } from '@chakra-ui/react'
import { useMobileValue } from 'utils/hooks'

import Duplicates from './Duplicates'
import { useIsValid } from 'utils/hooks.js'

const Write = ({ questionCode, data, onSendAnswer, regexPattern }) => {
  const value = data?.value

  const isValid = useIsValid(value)(regexPattern)

  const maxW = useMobileValue(['', '25vw'])
  return (
    <Box>
      <Input
        test-id={questionCode}
        defaultValue={data?.value}
        type="email"
        onBlur={e => onSendAnswer(e.target.value)}
        w="full"
        maxW={maxW}
        isInvalid={!isValid}
      />
      <Duplicates email={data?.value} sourceCode={data.baseEntityCode} />
    </Box>
  )
}

const Read = ({ data }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      title: `${data?.value} copied!`,
      status: 'success',
      duration: 1000,
    })
  }
  return (
    <Text cursor="pointer" onClick={onClick} w="16rem">
      {data?.value}
    </Text>
  )
}

const Email = {
  Write,
  Read,
}

export default Email
