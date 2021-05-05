import { Avatar, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const AgentMobile = ({ onClose, actions, sbeCode, beCode, src, name }) => {
  return (
    <Box w="100vw" overflowY="scroll">
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          color="black"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <VStack>
        <Avatar bg="white" p="4px" src={src} w="10rem" h="10rem" />
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {name?.value}
        </Text>
        {actions && (
          <HStack>
            {actions.map(action => (
              <Action
                parentCode={sbeCode}
                code={action}
                targetCode={beCode}
                key={action}
                size="md"
                colorScheme="blue"
              />
            ))}
          </HStack>
        )}
        <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
        <Attribute code={beCode} attribute={'PRI_STATUS'} />
        <VStack align="start" p="3">
          <Text textStyle="body.1">Contact details</Text>
          <Attribute code={beCode} attribute={'PRI_MOBILE'} />
          <Attribute code={beCode} attribute={'PRI_ADDRESS_FULL'} />
          <Attribute code={beCode} attribute={'PRI_EMAIL'} />
        </VStack>
      </VStack>
    </Box>
  )
}

export default AgentMobile
