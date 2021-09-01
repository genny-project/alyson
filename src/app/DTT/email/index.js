import { useState, useEffect } from 'react'

import { Box, Input, Text, useClipboard, useToast } from '@chakra-ui/react'
import { useMobileValue } from 'utils/hooks'
import { getIsInvalid } from 'utils/functions'
import Duplicates from './Duplicates'

const Write = ({ questionCode, data, onSendAnswer, regexPattern }) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)

  const isInvalid = getIsInvalid(userInput)(emailRegex)
  const maxW = useMobileValue(['', '25vw'])

  useEffect(() => {
    isInvalid === true ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  return (
    <Box>
      <>
        <Input
          test-id={questionCode}
          defaultValue={data?.value}
          type="email"
          onBlur={e => !errorStatus && onSendAnswer(e.target.value)}
          onChange={e => setuserInput(e.target.value)}
          w="full"
          maxW={maxW}
          isInvalid={isInvalid}
        />
        {errorStatus && (
          <Text textStyle="tail.error" mt={2}>{`Please enter a valid email address. `}</Text>
        )}
        <Duplicates email={data?.value} sourceCode={data.baseEntityCode} />
      </>
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
