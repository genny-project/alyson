import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, VStack, HStack, Badge } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

const HeroTask = ({ sbeCode, rows }) => {
  const targetCode = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const actions = getActions(sbe)
  const validation = useSelector(selectCode(targetCode, 'PRI_VALIDATION'))

  return (
    <VStack>
      <Text color="teal" fontWeight="bold">
        {title?.value}
      </Text>
      {validation?.value === 'Ready' ? (
        <Badge colorScheme="green">Complete</Badge>
      ) : (
        <Badge colorScheme="red">Incomplete</Badge>
      )}
      <HStack>
        {actions?.map(action => (
          <Action key={action} parentCode={sbeCode} code={action} targetCode={targetCode} />
        ))}
      </HStack>
    </VStack>
  )
}

export default HeroTask
