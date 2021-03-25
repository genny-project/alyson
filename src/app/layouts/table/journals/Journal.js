import { Box, VStack, Text, HStack } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Journal = ({ code }) => {
  const hours = useSelector(selectCode(code, 'PRI_JOURNAL_HOURS'))
  const date = useSelector(selectCode(code, 'PRI_JOURNAL_DATE'))
  const learningOutcomes = useSelector(selectCode(code, 'PRI_JOURNAL_LEARNING_OUTCOMES'))
  const tasks = useSelector(selectCode(code, 'PRI_JOURNAL_TASKS'))

  return (
    <Box p="3">
      <VStack align="start">
        <HStack>
          <Text fontWeight="semibold">{`${date?.value}`}</Text>
          <Text color="teal" fontWeight="semibold">{`${hours?.value} hrs`}</Text>
        </HStack>

        <HStack align="start" justify="start">
          <Text w="15rem" fontWeight="semibold">
            Learning Outcomes
          </Text>
          <Text w="40rem">{learningOutcomes?.value}</Text>
        </HStack>
        <HStack justify="start" align="start">
          <Text w="15rem" fontWeight="semibold">
            Tasks
          </Text>
          <Text w="40rem">{tasks?.value}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Journal
