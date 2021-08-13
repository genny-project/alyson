import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { VStack, Spacer, HStack, Text } from '@chakra-ui/react'

import { selectCode } from 'redux/db/selectors'
import InternshipCard from 'app/SBE/detail/rep/linked_internships/Card'
import Card from 'app/layouts/components/card'
import { useIsMobile } from 'utils/hooks'

const LinkedInternships = ({ sbeCode }) => {
  const rows = useSelector(selectRows(sbeCode))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const width = useIsMobile() ? '90vw' : '33vw'

  return (
    <Card variant="card0" w={width}>
      <VStack>
        <HStack w="full" p="2">
          <Text fontSize="xl" fontWeight="normal" color="primary">
            Internships I Look After
          </Text>
          <Spacer />
          <Text fontSize="xl" fontWeight="normal">
            {total?.value}
          </Text>
        </HStack>
        {rows.map(row => (
          <InternshipCard key={row} code={row} parentCode={sbeCode} />
        ))}
      </VStack>
    </Card>
  )
}

export default LinkedInternships
