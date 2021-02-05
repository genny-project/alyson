import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconButton } from '@chakra-ui/react'

const Read = ({ data }) => {
  const attributeName = data?.attributeName
  const icon = attributeName === 'LinkedIn URL' ? faLinkedin : faCoffee

  return (
    <IconButton colorScheme="linkedin">
      <FontAwesomeIcon size="lg" icon={icon} />
    </IconButton>
  )
}

const Social = {
  Read,
}

export default Social
