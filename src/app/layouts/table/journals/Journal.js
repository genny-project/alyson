import { HStack, Text, VStack } from '@chakra-ui/layout'
import { equals, includes, isEmpty, map, reduce } from 'ramda'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import getUserType from 'utils/helpers/get-user-type'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

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
  const textColor = equals('APPROVED')(journalStatus) ? 'success.500' : 'error.500'

  return (
    <Card>
      <VStack align="start">
        <HStack>
          <Text textStyle="body.1">{`${date?.value}`}</Text>
          <Text color="teal" textStyle="body.1">{`${hours?.value} hrs`}</Text>
          <Attribute code={code} attribute={'PRI_STATUS'} config={{ color: textColor }} />
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
          <Text maxW="30rem" textStyle="body.3">
            {`What did you do while on your internship today?`}
          </Text>
          <Text dangerouslySetInnerHTML={{ __html: tasks?.value }} w="40rem" maxW="85vw" />
        </VStack>
        <VStack align="start" justify="start">
          <Text maxW="30rem" textStyle="body.3">
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
