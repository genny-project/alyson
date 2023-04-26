import { Box, Progress, Text, VStack } from '@chakra-ui/react'
import { multiply, pathOr } from 'ramda'

import { useIsProductInternmatch } from 'utils/helpers/check-product-name.js'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const ProgressBar = (props, showCard = true) => {
  const { data, value } = props
  const { internshipProgress = 0, completedJournals = 0 } = safelyParseJson(value)
  const dataValue = data?.value || data?.valueDouble || 0
  const dataValueInPercentage = multiply(100)(dataValue)

  const isProductInternMatch = useIsProductInternmatch()

  const label = pathOr('', ['attribute', 'name'])(data)

  const completedJournalsPercentage = (() => {
    try {
      // eslint-disable-next-line no-eval
      return eval(completedJournals) * 100
    } catch (e) {
      console.error(e)
    }
  })()

  const hasBoxStyle = false

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
    <Box
      flex={'1 1 100%'}
      w="full"
      margin={showCard ? 0 : '1rem 0 0 0 !important'}
      paddingBlock={!showCard ? 6 : 0}
      paddingInline={!showCard ? 12 : 0}
      borderRadius={!showCard ? '2.5rem' : 0}
      background={showCard ? 'white' : 'transparent'}
      transform={showCard ? 'translateY(-.5rem)' : 'initial'}
    >
      <Progress
        w="full"
        colorScheme={showCard ? 'internmatch' : 'orange'}
        borderRadius={showCard ? 'lg' : 'md'}
        value={dataValueInPercentage}
        h={showCard ? '1.25rem' : '.75rem'}
        bg={isProductInternMatch ? 'internmatch.100' : 'gray.100'}
      />
      {!isProductInternMatch && (
        <Text as="label" fontSize={'sm'} fontWeight={500} color={'#EF8567'} fontFamily="Roboto">
          {label}
        </Text>
      )}
    </Box>
  )
}

export default ProgressBar
