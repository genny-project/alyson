import { HStack } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import { always, includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import SigDetails from './SigDetails'

const AgentDetail = ({ code, parentCode }) => {
  const agentCode = useSelector(selectCode(code, 'LNK_AGENT'), always(true))

  const agentPerCode = agentCode?.value

  return (
    <HStack mt="3" w="full" justify="flex-end">
      {includes('SBE_OFFERED_', parentCode) && <SigDetails code={code} />}
      <Attribute code={agentPerCode} config={{ size: 'xs' }} attribute="PRI_IMAGE_URL" />
    </HStack>
  )
}

export default AgentDetail
