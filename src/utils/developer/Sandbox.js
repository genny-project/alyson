import { VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { HostCpyRepIcon } from './HostCpyRepIcon'

const Sandbox = () => {
  return (
    <VStack>
      <FontAwesomeIcon icon={faCamera} />
      <HostCpyRepIcon />
    </VStack>
  )
}

export default Sandbox
