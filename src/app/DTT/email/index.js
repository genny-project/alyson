import { Text, useClipboard, useToast } from '@chakra-ui/react'

import CommonWriteComponent from '../../../utils/useRegexCheck'

/*const Write = ({ questionCode, data, onSendAnswer, regexPattern }) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatch } = useError()
  const isInvalid = getIsInvalid(userInput)(emailRegex)
  const maxW = useMobileValue(['', '25vw'])

  useEffect(() => {
    isInvalid === true ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid === true
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

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
}*/

const Write = ({ questionCode, onSendAnswer, data, regex }) => {
  const regexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const errorMsg = 'Please enter a valid email address. E.g: yourname@domain.com'

  return (
    <CommonWriteComponent
      questionCode={questionCode}
      onSendAnswer={onSendAnswer}
      data={data}
      regex={regexPattern}
      errorMsg={errorMsg}
    />
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
