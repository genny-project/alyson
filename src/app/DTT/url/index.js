import CommonWriteComponent from '../../../utils/useRegexCheck'
import { Link } from '@chakra-ui/react'
import { includes } from 'ramda'

export const Read = ({ data, size }) => {
  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  return (
    <Link href={href} fontSize={size}>
      {data?.value}
    </Link>
  )
}

export const Write = ({ questionCode, onSendAnswer, data }) => {
  const regexPattern = /[(a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  const errorMsg = 'Website must be in format: yourcompany.com'

  return (
    <CommonWriteComponent
      questionCode={questionCode}
      onSendAnswer={onSendAnswer}
      data={data}
      regexPattern={regexPattern}
      errorMsg={errorMsg}
      mask=""
    />
  )
}

const URL = {
  Write,
  Read,
}

export default URL
