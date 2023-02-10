import { IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { includes, toLower } from 'ramda'
import Text from '../text'

const Read = ({ data, config = {} }) => {
  const attributeName = data?.attributeName

  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  if (includes('linkedin')(toLower(attributeName || ''))) {
    return (
      <a href={href}>
        <FontAwesomeIcon
          size="lg"
          icon={faLinkedinIn}
          test-id={data?.baseEntityCode}
          {...config}
          isDisabled={!data?.value}
          color="#3182CE"
        />
      </a>
    )
  }

  return (
    <a href={href}>
      <IconButton test-id={data?.baseEntityCode} colorScheme="linkedin" isDisabled={!data?.value}>
        <FontAwesomeIcon size="lg" icon={faGlobe} />
      </IconButton>
    </a>
  )
}

const Write = ({
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
}) => {
  const [socialMediaIcon, setSocialMediaIcon] = useState()

  const attributeName = data?.attributeName

  useEffect(() => {
    includes('linkedin')(toLower(attributeName || ''))
      ? setSocialMediaIcon(faLinkedinIn)
      : setSocialMediaIcon(faGlobe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Text.Write
      icon={socialMediaIcon}
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
}

const Social = {
  Read,
  Write,
}

export default Social
