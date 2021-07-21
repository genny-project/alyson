import { includes } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconButton, InputGroup, InputLeftAddon, Input } from '@chakra-ui/react'
import { useMobileValue } from 'utils/hooks'

const Read = ({ data, config = {} }) => {
  const attributeName = data?.attributeName

  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  if (attributeName === 'LinkedIn URL') {
    return (
      <a href={href}>
        <FontAwesomeIcon
          size="lg"
          icon={faLinkedin}
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
        <FontAwesomeIcon size="lg" icon={faCoffee} />
      </IconButton>
    </a>
  )
}

const Write = ({ questionCode, onSendAnswer, data }) => {
  const maxW = useMobileValue('', '25vw')
  return (
    <InputGroup w="full" maxW={maxW}>
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
