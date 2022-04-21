import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { find, includes, isEmpty, map } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { selectDashboard } from '../../../../redux/app/selectors'
import { useSelector } from 'react-redux'

const Meetings = ({ labelCode }) => {
  const userCode = useSelector(selectCode('USER'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))?.value

  const dashboardSbes = useSelector(selectDashboard)
  const meetingsSbe = dashboardSbes && find(includes('_MENTORING_MEETINGS_'))(dashboardSbes)
  const meetings = useSelector(selectRows(meetingsSbe))

  return Array.isArray(meetings) && isEmpty(meetings) ? (
    <Box h="inherit" mb={5}>
      <Card position="sticky" top="10vh">
        <VStack spacing={5}>
          <Text textStyle="head.1">{`Hello ${name}`}</Text>
          <Text textStyle="head.2">{`Please select date for first mentoring session. Dates for remaining sessions will be calculated automatically.`}</Text>
        </VStack>
      </Card>
    </Box>
  ) : (
    <Box h="inherit" minW="30%">
      <Card>
        <VStack spacing={7} paddingRight={10}>
          <Text alignSelf="flex-start" textStyle="head.2">{`Meeting List`}</Text>
          <VStack spacing={5} alignSelf="flex-start">
            {map(meeting => (
              <>
                <HStack
                  spacing={7}
                  alignSelf="flex-start"
                  w="100%"
                  justifyContent="space-between"
                  key={meeting}
                >
                  <Attribute
                    config={{ size: 'xl' }}
                    code={meeting}
                    attribute="PRI_STATUS"
                    hasIndicatorIcon={'true'}
                  />
                  <Attribute config={{ size: 'xl' }} code={meeting} attribute="PRI_MEETING_TIME" />

                  {/* <a target="_blank" rel="noopener noreferrer" href={'link'}> */}
                  <FontAwesomeIcon icon={faVideo} color="darkGrey" />
                  {/* </a> */}
                </HStack>
              </>
            ))(meetings)}
          </VStack>
        </VStack>
      </Card>
    </Box>
  )
}

export default Meetings
