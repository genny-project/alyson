import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { find, includes, map } from 'ramda'

import Attribute from 'app/BE/attribute'
import BookedByMentee from './bookedByMentee'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { selectCode } from '../../../../redux/db/selectors'
import { selectDashboard } from '../../../../redux/app/selectors'
import { selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Meetings = ({ mentorStatus }) => {
  const dashboardSbes = useSelector(selectDashboard)
  const meetingsSbe = dashboardSbes && find(includes('_MENTORING_MEETINGS_'))(dashboardSbes)
  const meetings = useSelector(selectRows(meetingsSbe))
  const bookedMeetingTime = dashboardSbes && find(includes('_MENTEE_MNG_BOOKED'))(dashboardSbes)
  const menteeCode = useSelector(selectRows(bookedMeetingTime))[0]
  const menteeAttributes = useSelector(selectCode(menteeCode, 'allAttributes'))

  return mentorStatus === 'MATCHED' && menteeAttributes ? (
    <BookedByMentee menteeCode={menteeCode} />
  ) : mentorStatus === 'MATCHED' ? (
    <Box h="inherit" minW="30%" ml={2}>
      <Card position="sticky" top="10vh">
        <VStack spacing={7} paddingRight={10}>
          <Text
            alignSelf="flex-start"
            textStyle="head.2"
          >{`Great, now we wait for the mentee to agree to one of your selected Meet & Greet dates.`}</Text>
        </VStack>
      </Card>
    </Box>
  ) : (
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
