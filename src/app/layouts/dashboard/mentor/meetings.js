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

const Meetings = ({ mentorStatus, setShowDetailView, setCurrentMentee }) => {
  const dashboardSbes = useSelector(selectDashboard)
  const meetingsSbe = dashboardSbes && find(includes('_MENTORING_MEETINGS_'))(dashboardSbes)
  const meetings = useSelector(selectRows(meetingsSbe))
  const bookedMeetingTime = dashboardSbes && find(includes('_MENTEE_MNG_BOOKED'))(dashboardSbes)
  const menteeCode = useSelector(selectRows(bookedMeetingTime))[0]
  const menteeAttributes = useSelector(selectCode(menteeCode, 'allAttributes'))

  return mentorStatus === 'MATCHED' && menteeAttributes ? (
    <BookedByMentee
      menteeCode={menteeCode}
      setShowDetailView={setShowDetailView}
      setCurrentMentee={setCurrentMentee}
    />
  ) : (
    <Box h="inherit" minW="30%">
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
            ))(meetings)}
          </VStack>
        </VStack>
      </Card>
    </Box>
  )
}

export default Meetings
