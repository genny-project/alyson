import { includes } from 'ramda'
import { Link } from '@chakra-ui/react'
import { Write as TextWrite } from '../text'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export const Read = ({ data, size }) => {
  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  return (
    <Link href={href} fontSize={size}>
      {data?.value}
    </Link>
  )
}

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  parentCode,
  attributeCode,
  placeholderName,
  mandatory,
  inputmask,
}) => (
  <TextWrite
    icon={faGlobe}
    questionCode={questionCode}
    onSendAnswer={onSendAnswer}
    data={data}
    regexPattern={regexPattern}
    attributeCode={attributeCode}
    parentCode={parentCode}
    errorMessage={errorMessage}
    placeholderName={placeholderName}
    mandatory={mandatory}
    inputmask={inputmask}
  />
)

const URL = {
  Write,
  Read,
}

export default URL
