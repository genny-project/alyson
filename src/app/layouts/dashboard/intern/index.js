import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { selectAttributes } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Recommendations from './recommendations'
import Process from 'app/layouts/process'
import { useColorModeValue } from '@chakra-ui/color-mode'
import Attribute from 'app/BE/attribute'

const Intern = ({ userCode }) => {
  const [name] = useSelector(selectAttributes(userCode, ['PRI_NAME']))

  const cardBg = useColorModeValue('white', '')

  return (
    <VStack spacing="6">
      <HStack align="stretch">
        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
          <HStack spacing="5">
            <Box
              onClick={() =>
                onSendMessage({
                  code: 'QUE_AVATAR_PROFILE_GRP',
                  parentCode: 'QUE_AVATAR_GRP',
                  rootCode: userCode,
                  targetCode: userCode,
                })
              }
            >
              <Attribute code={userCode} attribute="PRI_IMAGE_URL" config={{ size: '2xl' }} />
            </Box>
            <VStack align="start">
              <Text textStyle="tail3">Welcome back,</Text>
              <Text textStyle="head1">{name?.value}</Text>
            </VStack>
          </HStack>
        </Box>
        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
          <VStack align="stretch">
            <Text textStyle="body1">Actions</Text>
            <Button
              onClick={() =>
                onSendMessage({
                  code: 'QUE_TREE_ITEM_INTERNSHIPS',
                  parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
                })
              }
              colorScheme="primary"
              leftIcon={<FontAwesomeIcon icon={faSearch} />}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            >
              {`Find an Internship`}
            </Button>
            <Button colorScheme="primary" variant="outline">
              Edit Your Profile
            </Button>
          </VStack>
        </Box>
      </HStack>

      <Process dashboard />
      <Recommendations />
    </VStack>
  )
}

export default Intern
