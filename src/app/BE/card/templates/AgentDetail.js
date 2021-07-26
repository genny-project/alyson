import { Flex, HStack, Spacer, Box } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import { includes } from 'ramda'
import FunActions from './FunActions'
import SigDetails from './SigDetails'

const AgentDetail = ({ code, parentCode }) => {
  return (
    <Box>
      <Flex mt="3" w="full" justify="flex-end">
        {includes('SBE_OFFERED_', parentCode) && <SigDetails viewer="agent" code={code} />}
      </Flex>

      <Flex mt="3" w="full" justify="flex-end">
        <FunActions code={code} parentCode={parentCode} />
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
