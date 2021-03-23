import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { VStack, useColorModeValue, Spacer, HStack, Text } from '@chakra-ui/react'

import { selectCode } from 'redux/db/selectors'
import Card from 'app/SBE/detail/rep/linked_internships/Card'

const LinkedInternships = ({ sbeCode }) => {
  const rows = useSelector(selectRows(sbeCode))
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))

  const color = useColorModeValue('primary.50', 'primary.900')

  return (
    <VStack bg={color} p="3" borderRadius="lg" shadow="lg" mb="4">
      <HStack w="full" p="2">
        <Text fontSize="xl" fontWeight="normal" color="primary">
          {title?.value}
        </Text>
        <Spacer />
        <Text fontSize="xl" fontWeight="normal">
          {total?.value}
        </Text>
      </HStack>
      {rows.map(row => (
        <Card key={row} code={row} parentCode={sbeCode} />
      ))}
    </VStack>
  )
}

export default LinkedInternships
