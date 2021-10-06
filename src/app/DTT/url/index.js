import { Text as ChakraText, Input, Link } from '@chakra-ui/react'
// import { Write } from '../text'
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import { useError } from 'utils/contexts/ErrorContext'
import { useMobileValue } from 'utils/hooks'
import useRegexCheck from '../../../utils/useRegexCheck'

export const Read = ({ data, size }) => {
  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  return (
    <Link href={href} fontSize={size}>
      {data?.value}
    </Link>
  )
}

export const Write = ({ questionCode, data, createOnTrigger }) => {
  const [userInput, setuserInput] = useState(data?.value)
  const [errorStatus, setErrorStatus] = useState(false)

  const urlRegex = RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  )

  const inputRef = useRef()
  const maxW = useMobileValue(['', '25vw'])

  const { dispatch } = useError()
  const isInvalid = getIsInvalid(userInput)(urlRegex)

  console.log('DataType', createOnTrigger)

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid === true
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  return (
    <>
      <Input
        test-id={questionCode}
        defaultValue={data?.value}
        w="full"
        maxW={maxW}
        ref={inputRef}
        onChange={e => setuserInput(e.target.value)}
      />
      {errorStatus && (
        <ChakraText
          textStyle="tail.error"
          mt={2}
        >{`Website address must be in https://yourwebsite.com`}</ChakraText>
      )}
    </>
  )
}

const URL = {
  Write,
  Read,
}

export default URL
