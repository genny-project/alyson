import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const EventButton = props => {
  const { name, onClick, disabled } = props

  return (
    <Button
      leftIcon={<FontAwesomeIcon icon={faCheck} />}
      colorScheme="teal"
      variant="solid"
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </Button>
  )
}

export default EventButton
