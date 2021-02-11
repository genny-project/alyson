import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Heading, VStack, Stat, StatLabel, StatNumber, HStack } from '@chakra-ui/react'
import { getTableActions } from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

const OurInterns = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const tableActions = getTableActions(sbe)

  return (
    <VStack>
      <Heading>Our Interns</Heading>
      <Stat>
        <StatLabel>Total</StatLabel>
        <StatNumber>{total?.value}</StatNumber>
      </Stat>
      <HStack>
        {tableActions?.map(action => (
          <Action key={action} parentCode={sbeCode} code={action} />
        ))}
      </HStack>
    </VStack>
  )
}

export default OurInterns
