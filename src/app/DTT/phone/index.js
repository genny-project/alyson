import { Text, useClipboard, useToast, Input } from '@chakra-ui/react'
import phoneNumberFormatter from 'utils/formatters/phone-number'
import { useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'
import { useMobileValue } from 'utils/hooks'
import { getIsInvalid } from 'utils/functions'

const Read = ({ data, config }) => {
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
    <Text cursor="pointer" w="10rem" onClick={onClick} {...config}>
      {phoneNumberFormatter(data.value)}
    </Text>
  )
}

export const Write = ({ questionCode, data, onSendAnswer, regexPattern }) => {
  const inputRef = useRef()
  const value = data?.value
  const isInvalid = getIsInvalid(value)(regexPattern)

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter') {
        event.preventDefault()
        inputRef.current.blur()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  const maxW = useMobileValue(['', '25vw'])

  return (
    <Input
      test-id={questionCode}
      ref={inputRef}
      onBlur={e => debouncedSendAnswer(e.target.value)}
      defaultValue={data?.value}
      w="full"
      maxW={maxW}
      isInvalid={isInvalid}
    />
  )
}

const Phone = {
  Write,
  Read,
}

export default Phone
