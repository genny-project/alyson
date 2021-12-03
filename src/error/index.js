import { Center, Link, Text, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import showRedirectUrl from 'utils/helpers/show-redirect-url'
import { useGetRealm } from 'utils/hooks'

const Error = () => {
  const realm = useGetRealm()

  return (
    <Center h="90vh">
      <VStack>
        <Text>
          <FontAwesomeIcon color="grey" size="2x" icon={faCogs} />
        </Text>
        <Text color="grey">Sorry, {realm} is just down for maintenance.</Text>
        {showRedirectUrl(realm) && (
          <Text color="grey">
            Check <Link href={'https://internmatch.io/'}>https://internmatch.io/</Link> for updates.
          </Text>
        )}
      </VStack>
    </Center>
  )
}

export default Error
