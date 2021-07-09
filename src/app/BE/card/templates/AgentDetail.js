import { Flex, HStack, Spacer, Box } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import { always, includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import FunActions from './FunActions'
import SigDetails from './SigDetails'

const AgentDetail = ({ code, parentCode }) => {
  const agentCode = useSelector(selectCode(code, 'LNK_AGENT'), always(true))

  const agentPerCode = agentCode?.value

  return (
    <Box>
      <Flex mt="3" w="full" justify="flex-end">
        {includes('SBE_OFFERED_', parentCode) && <SigDetails viewer="agent" code={code} />}
      </Flex>

      <Flex mt="3" w="full" justify="flex-end">
        <FunActions code={code} parentCode={parentCode} />
        <Spacer minW="1" />
        <HStack>
          <Attribute code={agentPerCode} config={{ size: 'xs' }} attribute="PRI_IMAGE_URL" />
        </HStack>
      </Flex>
    </Box>
  )
}

export default AgentDetail
