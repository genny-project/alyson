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

export const Write = ({ questionCode, onSendAnswer, data, regex }) => {
  const regexPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  const errorMsg =
    'Website must be in format: www.yourcompany.com or http://yourcompany.com or https://yourcompany.com'

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

const URL = {
  Write,
  Read,
}

export default URL
