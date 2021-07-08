import { Flex, HStack, Spacer } from '@chakra-ui/react'
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
    <Flex mt="3" w="full" justify="flex-end">
      <FunActions code={code} parentCode={parentCode} />
      <Spacer minW="1" />
      <HStack>
        {includes('SBE_OFFERED_', parentCode) && <SigDetails viewer="agent" code={code} />}
        <Attribute code={agentPerCode} config={{ size: 'xs' }} attribute="PRI_IMAGE_URL" />
      </HStack>
    </Flex>
  )
}

export default AgentDetail
