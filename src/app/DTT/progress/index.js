import { Box, Progress, Text, VStack } from '@chakra-ui/react'

import { multiply, pathOr } from 'ramda'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const ProgressBar = props => {
  const { data, value } = props
  const { internshipProgress = 0, completedJournals = 0 } = safelyParseJson(value)
  const dataValue = data?.value || data?.valueDouble || 0
  const dataValueInPercentage = multiply(100)(dataValue)

  const label = pathOr('', ['attribute', 'name'])(data)

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
    <Box flex={'1 1 100%'} w="full" margin={'1rem 0 0 0 !important'}>
      <Progress w="full" colorScheme="orange" borderRadius="md" value={dataValueInPercentage} />
      <Text as="label" fontSize={'sm'} fontWeight={500} color={'#EF8567'} fontFamily="Roboto">
        {label}
      </Text>
    </Box>
  )
}

export default ProgressBar
