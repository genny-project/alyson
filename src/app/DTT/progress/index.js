import { Progress, VStack, Text } from '@chakra-ui/react'
import { multiply } from 'ramda'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const ProgressBar = props => {
  const { data, value } = props
  const { internshipProgress = 0, completedJournals = 0 } = safelyParseJson(value)
  const dataValue = data?.value || data?.valueDouble || 0
  const dataValueInPercentage = multiply(100)(dataValue)

  const completedJournalsPercentage = (() => {
    try {
      // eslint-disable-next-line no-eval
      return eval(completedJournals) * 100
    } catch (e) {
      console.error(e)
    }
  })()

  return internshipProgress || completedJournals ? (
    <VStack alignItems="start">
      <Text> {`Internship Progress`} </Text>
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
    <Progress w="full" colorScheme="green" borderRadius="md" value={dataValueInPercentage} />
  )
}

export default ProgressBar
