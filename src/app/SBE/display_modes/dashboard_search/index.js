import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, VStack, HStack, Stat, StatNumber } from '@chakra-ui/react'
import { getTableActions } from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'
import Card from 'app/layouts/components/card'

const DashboardSearch = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const tableActions = getTableActions(sbe)

  return (
    <Card>
      <VStack>
        <Text textStyle="body1">{title?.value}</Text>
        <HStack>
          <Stat>
            <StatNumber>{total?.value}</StatNumber>
          </Stat>
          <VStack align="right">
            {tableActions?.map(action => (
              <Action key={action} parentCode={sbeCode} code={action} />
            ))}
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
}

export default DashboardSearch
