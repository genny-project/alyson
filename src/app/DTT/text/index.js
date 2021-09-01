import { useState, useEffect, useRef } from 'react'
import { Input, Text as ChakraText } from '@chakra-ui/react'
import debounce from 'lodash.debounce'

import { useMobileValue } from 'utils/hooks'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import { getIsInvalid } from 'utils/functions'

export const Write = ({ questionCode, data, onSendAnswer }) => {
  // eslint-disable-next-line no-useless-escape
  const textRegex = RegExp(/^[a-zA-Z]*$/)

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const inputRef = useRef()
  const value = data?.value
  const isInvalid = getIsInvalid(value)(textRegex)

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

  useEffect(() => {
    isInvalid === true ? setShowErrorMessage(true) : setShowErrorMessage(false)
  }, [isInvalid])

  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  const maxW = useMobileValue(['', '25vw'])

  return (
    <>
      <Input
        test-id={questionCode}
        ref={inputRef}
        onBlur={e => debouncedSendAnswer(e.target.value)}
        defaultValue={data?.value}
        w="full"
        maxW={maxW}
        isInvalid={isInvalid}
      />
      {showErrorMessage && (
        <ChakraText textStyle="tail.error" mt={2}>{`You can only enter alphabets.`}</ChakraText>
      )}
    </>
  )
}

export const Read = ({ data, config = {} }) => {
  const { detailViewTags } = config

  if (detailViewTags) {
    return <DetailViewTags data={data} />
  }

  return (
    <ChakraText noOfLines={3} {...config}>
      {data?.value || config.defaultValue}
    </ChakraText>
  )
}

const Text = {
  Write,
  Read,
}

export default Text
