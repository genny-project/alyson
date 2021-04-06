import { Box, VStack, Text, HStack } from '@chakra-ui/layout'
import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Journal = ({ code, actions, parentCode }) => {
  const hours = useSelector(selectCode(code, 'PRI_JOURNAL_HOURS'))
  const date = useSelector(selectCode(code, 'PRI_JOURNAL_DATE'))
  const learningOutcomes = useSelector(selectCode(code, 'PRI_JOURNAL_LEARNING_OUTCOMES'))
  const tasks = useSelector(selectCode(code, 'PRI_JOURNAL_TASKS'))

  return (
    <Box p="3">
      <VStack align="start">
        <HStack>
          <Text textStyle="body1">{`${date?.value}`}</Text>
          <Text color="teal" textStyle="body1">{`${hours?.value} hrs`}</Text>
          <Attribute code={code} attribute={'PRI_STATUS'} />
        </HStack>
        <HStack>
          {actions &&
            actions.map(action => (
              <Action code={action} targetCode={code} parentCode={parentCode} />
            ))}
        </HStack>

        <VStack align="start" justify="start">
          <Text w="15rem" textStyle="body3">
            Learning Outcomes
          </Text>
          <Text w="40rem">{learningOutcomes?.value}</Text>
        </VStack>

        <VStack justify="start" align="start">
          <Text w="15rem" textStyle="body3">
            Tasks
          </Text>
          <Text w="40rem">{tasks?.value}</Text>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Journal
