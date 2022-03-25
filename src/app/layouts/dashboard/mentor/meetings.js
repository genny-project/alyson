import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { find, includes, map } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { selectDashboard } from '../../../../redux/app/selectors'
import { useSelector } from 'react-redux'

const Meetings = () => {
  const userCode = useSelector(selectCode('USER'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))?.value

  const dashboardSbes = useSelector(selectDashboard)
  const meetingsSbe = dashboardSbes && find(includes('_MENTORING_MEETINGS_'))(dashboardSbes)
  const meetings = useSelector(selectRows(meetingsSbe))

  return (
    <Box h="inherit" minW="30%" ml={2}>
      <Card position="sticky" top="10vh">
        <VStack spacing={7} paddingRight={10}>
          <Text alignSelf="flex-start" textStyle="head.2">{`Meeting List`}</Text>
          <VStack spacing={5} alignSelf="flex-start">
            {map(meeting => (
              <HStack
                spacing={7}
                alignSelf="flex-start"
                w="100%"
                justifyContent="space-between"
                key={meeting}
              >
                {/* {'completed' ? (
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                ) : (
                  <FontAwesomeIcon icon={faCalendar} color="darkGrey" />
                )} */}
                <Attribute config={{ size: 'xl' }} code={meeting} attribute="PRI_MEETING_TIME" />

                {/* <a target="_blank" rel="noopener noreferrer" href={'link'}> */}
                <FontAwesomeIcon icon={faVideo} color="darkGrey" />
                {/* </a> */}
              </HStack>
            ))(meetings)}
          </VStack>
        </VStack>
      </Card>
    </Box>
  )
}

export default Meetings
