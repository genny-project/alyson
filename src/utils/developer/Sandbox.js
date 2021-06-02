import { VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const Sandbox = () => {
  return (
    <VStack>
      <FontAwesomeIcon icon={faCamera} />
    </VStack>
  )
}

export default Sandbox
