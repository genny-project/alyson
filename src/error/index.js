import { Center, Heading, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Error = () => (
  <Center h="90vh">
    <VStack spacing="15">
      <FontAwesomeIcon size="4x" icon={faExclamationCircle} color="red" />
      <Heading>Sorry our server is not responding, try again later!</Heading>
    </VStack>
  </Center>
)

export default Error
