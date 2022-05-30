import { Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'

import Card from 'app/layouts/components/card'
import { selectCodes } from 'redux/db/selectors'
import { selectProcess } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const AgentDashboardSummary = () => {
  const processCodes = useSelector(selectProcess)

  const titles = useSelector(selectCodes(processCodes, 'SCH_TITLE')) || []
  const totals = useSelector(selectCodes(processCodes, 'PRI_TOTAL_RESULTS')) || []

  if (!titles.length) return null
  return (
    <Card boxShadow={'md'}>
      <Wrap justify="center" spacing={5} w={['xs', 'md']} wrap="wrap">
        {titles.map((title, idx) =>
          title ? (
            <WrapItem key={idx}>
              <VStack>
                <Text textStyle="body.1">{title.value}</Text>
                <Text>{totals[idx]?.value}</Text>
              </VStack>
            </WrapItem>
          ) : null,
        )}
      </Wrap>
    </Card>
  )
}

export default AgentDashboardSummary
