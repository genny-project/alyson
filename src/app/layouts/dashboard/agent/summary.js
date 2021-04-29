import { HStack, VStack, Text } from '@chakra-ui/layout'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import { selectCodes } from 'redux/db/selectors'

const AgentDashboardSummary = () => {
  const processCodes = useSelector(selectProcess)

  const titles = useSelector(selectCodes(processCodes, 'SCH_TITLE')) || []
  const totals = useSelector(selectCodes(processCodes, 'PRI_TOTAL_RESULTS')) || []

  if (!titles.length) return null
  return (
    <Card>
      <HStack spacing={5}>
        {titles.map((title, idx) =>
          title ? (
            <VStack key={idx}>
              <Text textStyle="body1">{title.value}</Text>
              <Text>{totals[idx]?.value}</Text>
            </VStack>
          ) : null,
        )}
      </HStack>
    </Card>
  )
}

export default AgentDashboardSummary
