import { Progress, VStack, Text } from '@chakra-ui/react'
import safelyParseJson from 'utils/helpers/safely-parse-json pull'
import { multiply } from 'ramda'

const ProgressBar = ({ data }) => {
  const { internshipProgress = 0, completedJournals = 0 } = safelyParseJson(data?.value)

  const completedJournalsPercentage = (() => {
    return multiply(completedJournals, 10)
  })()

  return internshipProgress || completedJournals ? (
    <VStack alignItems="start">
      <Text> {`Internship Progress`}</Text>
      <Progress w="full" colorScheme="green" borderRadius="md" value={internshipProgress} />
      <Text>{`Journals Completed: ${completedJournals}`} </Text>
      <Progress
        w="full"
        colorScheme="green"
        borderRadius="md"
        value={completedJournalsPercentage}
      />
    </VStack>
  ) : (
    <Progress w="full" colorScheme="green" borderRadius="md" value={50} />
  )
}

export default ProgressBar
