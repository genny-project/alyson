import React from 'react'
import { Text, Progress, Box } from '@chakra-ui/react'

import safelyParseJson from 'utils/helpers/safely-parse-json'

const ProgressBar = props => {
  const { value } = props

  const { completedPercentage = 0, completedJournals = 0 } = safelyParseJson(value)

  const completedJournalsPercentage = (() => {
    try {
      // eslint-disable-next-line no-eval
      return eval(completedJournals) * 100
    } catch (e) {
      console.error(e)
    }
  })()

  return (
    <Box>
      <Box w="90%" m="auto" mb={2}>
        <Text mb={1} fontSize="md" textTransform="none">{`Internship progress`}</Text>
        <Progress colorScheme="teal" size="xs" value={completedPercentage} />
      </Box>
      <Box w="90%" m="auto" mb={2}>
        <Text
          mb={1}
          fontSize="md"
          textTransform="none"
        >{`Journal progress ${completedJournals}`}</Text>
        <Progress colorScheme="pink" size="xs" value={completedJournalsPercentage} />
      </Box>
    </Box>
  )
}

export default ProgressBar
