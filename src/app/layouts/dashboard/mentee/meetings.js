import { Box, HStack, VStack } from '@chakra-ui/react'
import { find, includes, isEmpty, map, not } from 'ramda'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { selectDashboard } from '../../../../redux/app/selectors'
import { selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Meetings = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const meetingsSbe = dashboardSbes && find(includes('_MENTORING_MEETINGS_'))(dashboardSbes)
  const meetings = useSelector(selectRows(meetingsSbe))

  return (
    not(isEmpty(meetings)) && (
      <Box h="inherit" minW="30%" mb={5}>
        <Card>
          <VStack spacing={7} paddingRight={10}>
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
                    <Attribute
                      config={{ size: 'xl' }}
                      code={meeting}
                      attribute="PRI_MEETING_TIME"
                    />

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
  )
}

export default Meetings
