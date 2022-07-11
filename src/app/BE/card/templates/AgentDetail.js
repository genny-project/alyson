import { Flex, HStack, Spacer, Box } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import { includes } from 'ramda'
import FunActions from './FunActions'
import SigDetails from './SigDetails'
import { IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'

const AgentDetail = ({ code, parentCode, hasVideo }) => {
  return (
    <Box>
      <Flex mt="3" w="full" justify="flex-end">
        {includes('SBE_OFFERED_', parentCode) && <SigDetails viewer="agent" code={code} />}
      </Flex>

      <Flex mt="3" w="full" justify="flex-end">
        <HStack>
          <FunActions code={code} parentCode={parentCode} />
          {hasVideo && (
            <IconButton
              variant="ghost"
              colorScheme="whatsapp"
              icon={<FontAwesomeIcon icon={faVideo} />}
            />
          )}
        </HStack>

        <Spacer minW="1" />
        <HStack>
          <Attribute
            code={code}
            config={{ size: 'xs' }}
            attribute="_PRI_INTERN_CODE__LNK_AGENT__PRI_IMAGE_URL"
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default AgentDetail
