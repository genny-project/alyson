import { includes } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconButton, InputGroup, InputLeftAddon, Input } from '@chakra-ui/react'

const Read = ({ data }) => {
  const attributeName = data?.attributeName
  const icon = attributeName === 'LinkedIn URL' ? faLinkedin : faCoffee

  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  return (
    <a href={href}>
      <IconButton test-id={data?.baseEntityCode} colorScheme="linkedin" isDisabled={!data?.value}>
        <FontAwesomeIcon size="lg" icon={icon} />
      </IconButton>
    </a>
  )
}

const Write = ({ questionCode, onSendAnswer, data }) => {
  return (
    <InputGroup w="full" maxW="25vw">
      <InputLeftAddon>
        <FontAwesomeIcon size="lg" icon={faLinkedin} />
      </InputLeftAddon>
      <Input
        test-id={questionCode}
        defaultValue={data?.value}
        onBlur={e => onSendAnswer(e.target.value)}
      />
    </InputGroup>
  )
}

const Social = {
  Read,
  Write,
}

export default Social
