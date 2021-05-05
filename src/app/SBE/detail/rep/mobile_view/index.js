import { Avatar, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { includes, map, replace } from 'ramda'
import LinkedInternships from 'app/SBE/detail/rep/linked_internships'

const RepMobile = ({ onClose, src, name, jobTitle, assocHC, actions, sbeCode, beCode }) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
      overflowY="scroll"
    >
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <VStack>
        <Avatar bg="white" p="4px" src={src} w="10rem" h="10rem" />
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {name?.value}
        </Text>
        <Box mb="1rem">
          {assocHC ? <Text>{`${jobTitle}, ${assocHC}`}</Text> : <Text>{`${jobTitle}`}</Text>}
        </Box>
        {actions && (
          <HStack>
            {map(action => (
              <Action
                parentCode={sbeCode}
                code={action}
                targetCode={beCode}
                key={action}
                size="md"
                colorScheme="blue"
              />
            ))(actions)}
          </HStack>
        )}

        <VStack align="start" w="100vw" p="3">
          <Text textStyle="body.1">{`Contact details`}</Text>
          <Attribute code={beCode} attribute={'PRI_MOBILE'} />
          <Attribute code={beCode} attribute={'PRI_EMAIL'} />
          <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
          <Text textStyle="body.1">{`About Myself`}</Text>
          <Attribute code={beCode} attribute={'PRI_BIO'} />
          <HStack>
            <Text w="8rem" fontWeight="semibold">
              Department
            </Text>
            <Attribute code={beCode} attribute={'PRI_DEPARTMENT'} />
          </HStack>
          {includes('SBE_HOST_CPY_REP_', sbeCode) && (
            <LinkedInternships
              sbeCode={replace(
                'SBE_HOST_CPY_REP_',
                'SBE_LINKED_INTERNSHIP_OF_SUPERVISOR_',
                sbeCode,
              )}
            />
          )}
        </VStack>
      </VStack>
    </Box>
  )
}

export default RepMobile
