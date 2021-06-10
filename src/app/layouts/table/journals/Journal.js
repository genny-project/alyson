import { VStack, Text, HStack } from '@chakra-ui/layout'
import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Journal = ({ code, actions, parentCode }) => {
  const hours = useSelector(selectCode(code, 'PRI_JOURNAL_HOURS'))
  const date = useSelector(selectCode(code, 'PRI_JOURNAL_DATE'))
  const learningOutcomes = useSelector(selectCode(code, 'PRI_JOURNAL_LEARNING_OUTCOMES'))
  const tasks = useSelector(selectCode(code, 'PRI_JOURNAL_TASKS'))

  return (
    <Card>
      <VStack align="start">
        <HStack>
          <Text textStyle="body.1">{`${date?.value}`}</Text>
          <Text color="teal" textStyle="body.1">{`${hours?.value} hrs`}</Text>
          <Attribute code={code} attribute={'PRI_STATUS'} />
          {actions &&
            actions.map(action => (
              <Action key={action} code={action} targetCode={code} parentCode={parentCode} />
            ))}
        </HStack>
        <VStack justify="start" align="start">
          <Text w="15rem" textStyle="body.3">
            Tasks
          </Text>
          <Text dangerouslySetInnerHTML={{ __html: tasks?.value }} w="40rem" maxW="85vw" />
        </VStack>
        <VStack align="start" justify="start">
          <Text w="15rem" textStyle="body.3">
            Learning Outcomes
          </Text>
          <Text
            dangerouslySetInnerHTML={{ __html: learningOutcomes?.value }}
            w="40rem"
            maxW="85vw"
          />
        </VStack>
      </VStack>
    </Card>
  )
}

export default Journal
