import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconButton, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { Write as TextWrite } from 'app/DTT/text'

const Read = ({ data }) => {
  const attributeName = data?.attributeName
  const icon = attributeName === 'LinkedIn URL' ? faLinkedin : faCoffee

  return (
    <a href={data?.value}>
      <IconButton colorScheme="linkedin" isDisabled={!data?.value}>
        <FontAwesomeIcon size="lg" icon={icon} />
      </IconButton>
    </a>
  )
}

const Write = ({ onSendAnswer, data }) => (
  <InputGroup>
    <InputLeftAddon>
      <FontAwesomeIcon size="lg" icon={faLinkedin} />
    </InputLeftAddon>
    <TextWrite data={data} onSendAnswer={onSendAnswer} />
  </InputGroup>
)

const Social = {
  Read,
  Write,
}

export default Social
