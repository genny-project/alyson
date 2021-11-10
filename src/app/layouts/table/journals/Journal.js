import { VStack, Text, HStack } from '@chakra-ui/layout'
import { map, includes, reduce, isEmpty, equals } from 'ramda'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'

const Journal = ({ code, actions, parentCode }) => {
  const hours = useSelector(selectCode(code, 'PRI_JOURNAL_HOURS'))
  const date = useSelector(selectCode(code, 'PRI_JOURNAL_DATE'))
  const learningOutcomes = useSelector(selectCode(code, 'PRI_JOURNAL_LEARNING_OUTCOMES'))
  const tasks = useSelector(selectCode(code, 'PRI_JOURNAL_TASKS'))

  const getInternActions = allActions =>
    reduce((acc, value) => !includes('_EDIT')(value) && acc.concat(value), [])(allActions)

  const internsAction = getInternActions(actions)
  const user = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(user)))
  const journalStatus = useSelector(selectCode(code, 'PRI_STATUS'))?.value

  return (
    <Card>
      <VStack align="start">
        <HStack>
          <Text textStyle="body.1">{`${date?.value}`}</Text>
          <Text color="teal" textStyle="body.1">{`${hours?.value} hrs`}</Text>
          <Attribute code={code} attribute={'PRI_STATUS'} />
          {userType === 'INTERN' && equals('APPROVED')(journalStatus)
            ? !isEmpty(internsAction) &&
              map(action => (
                <Action key={action} code={action} targetCode={code} parentCode={parentCode} />
              ))(internsAction)
            : actions &&
              map(action => (
                <Action key={action} code={action} targetCode={code} parentCode={parentCode} />
              ))(actions)}
        </HStack>
        <VStack justify="start" align="start">
          <Text w="15rem" textStyle="body.3">
            {`What did you do today?`}
          </Text>
          <Text dangerouslySetInnerHTML={{ __html: tasks?.value }} w="40rem" maxW="85vw" />
        </VStack>
        <VStack align="start" justify="start">
          <Text w="15rem" textStyle="body.3">
            {`What did you learn today?`}
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
