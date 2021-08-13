import { Center, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

const Error = () => (
  <Center h="90vh">
    <VStack>
      <Text>
        <FontAwesomeIcon color="grey" size="2x" icon={faCogs} />
      </Text>
      <Text color="grey">Sorry, server is just down for maintenance.</Text>
    </VStack>
  </Center>
)

export default Error
