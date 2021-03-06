import { Box, Input, Text, useClipboard, useToast } from '@chakra-ui/react'
import { useMobileValue } from 'utils/hooks'

import Duplicates from './Duplicates'

const Write = ({ questionCode, data, onSendAnswer }) => {
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
