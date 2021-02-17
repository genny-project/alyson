import { includes } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconButton, InputGroup, InputLeftAddon, LinkOverlay } from '@chakra-ui/react'
import { Write as TextWrite } from 'app/DTT/text'

const Read = ({ data }) => {
  const attributeName = data?.attributeName
  const icon = attributeName === 'LinkedIn URL' ? faLinkedin : faCoffee

  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  return (
    <a href={href}>
      <IconButton colorScheme="linkedin" isDisabled={!data?.value}>
        <FontAwesomeIcon size="lg" icon={icon} />
      </IconButton>
    </a>
  )
}

const Write = ({ questionCode, onSendAnswer, data }) => (
  <InputGroup>
    <InputLeftAddon>
      <FontAwesomeIcon size="lg" icon={faLinkedin} />
    </InputLeftAddon>
    <TextWrite test-id={questionCode} data={data} onSendAnswer={onSendAnswer} />
  </InputGroup>
)

const Social = {
  Read,
  Write,
}

export default Social
