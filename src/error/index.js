import { Center, Link, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

const Error = () => (
  <Center h="90vh">
    <VStack>
      <Text>
        <FontAwesomeIcon color="grey" size="2x" icon={faCogs} />
      </Text>
      <Text color="grey">Sorry Internmatch is just down for maintenance.</Text>
      <Text color="grey">
        Check <Link href={'https://internmatch.io/'}>https://internmatch.io/</Link> for updates.
      </Text>
    </VStack>
  </Center>
)

export default Error
