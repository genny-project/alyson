import { Box, Progress, Text, VStack } from '@chakra-ui/react'
import { multiply, pathOr } from 'ramda'

import { useIsProductInternmatch } from 'utils/helpers/check-product-name.js'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const ProgressBar = (props, showCard = false) => {
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
      margin={showCard ? '0 !important' : '1rem 0 0 0 !important'}
      paddingBlock={showCard ? 0 : 2}
      paddingInline={showCard ? 0 : 2}
      borderRadius={showCard ? '2.5rem' : 0}
      background={showCard ? 'red' : 'transparent'}
      spacing={showCard ? 0 : 3}
      transform={showCard ? 'translateY(-.5rem)' : 'translateY(0)'}
    >
      <Progress
        w="full"
        colorScheme={showCard ? 'internmatch' : 'orange'}
        borderRadius={showCard ? 'lg' : 'md'}
        value={dataValueInPercentage}
        h={showCard ? '1.25rem' : '.75rem'}
        border={showCard ? '1px solid #CDD6D6' : 0}
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
