import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, VStack, HStack } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

const Agents = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const actions = getActions(sbe)

  return (
    <VStack>
      <HStack>
        <Text mr="1" textStyle="body.2">{`Total number of Agents: `}</Text>
        <Text textStyle="body.1">{total?.value}</Text>
      </HStack>
      <HStack>
        {actions?.map(action => (
          <Action key={action} parentCode={sbeCode} code={action} />
        ))}
      </HStack>
    </VStack>
  )
}

export default Agents
