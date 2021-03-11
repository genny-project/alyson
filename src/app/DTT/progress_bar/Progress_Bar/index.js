import React from 'react'
import { Text, Progress, Box, VStack } from '@chakra-ui/react'

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
    <VStack alignItems="start" w="48">
      <Text mb={1}>{`Internship progress`}</Text>
      <Progress w="full" colorScheme="primary" size="sm" value={completedPercentage} />
      <Text mb={1}>{`Journal progress ${completedJournals || ''}`}</Text>
      <Progress w="full" colorScheme="secondary" size="sm" value={completedJournalsPercentage} />
    </VStack>
  )
}

export default ProgressBar
