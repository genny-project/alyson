import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, VStack, HStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { getTableActions } from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

const DashboardSearch = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const tableActions = getTableActions(sbe)

  return (
    <VStack>
      <Text fontWeight="bold">{title?.value}</Text>
      <HStack>
        <Stat>
          <StatLabel>Total</StatLabel>
          <StatNumber>{total?.value}</StatNumber>
        </Stat>
        <VStack align="right">
          {tableActions?.map(action => (
            <Action key={action} parentCode={sbeCode} code={action} />
          ))}
        </VStack>
      </HStack>
    </VStack>
  )
}

export default DashboardSearch
