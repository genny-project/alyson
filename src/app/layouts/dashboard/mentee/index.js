import { Box, Grid, HStack, Link, Text } from '@chakra-ui/layout'
import { careerNavigatorLink, careerNavigatorText } from 'utils/constants'
import { compose, equals, find, includes, not } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import AlumniPage from 'app/layouts/dashboard/mentee/alumni'
import BookedTiming from './bookedTiming'
import DashboardMessages from '../dashboard_msg'
import DetailView from 'app/layouts/dashboard/mentee/detailView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Meetings from 'app/layouts/dashboard/mentee/meetings'
import MenteeDetailView from 'app/layouts/dashboard/mentor/menteeDetailView'
import MenteeStats from './menteeStats'
import ProvidedTimings from './providedTimings'
import Recommendation from 'app/layouts/dashboard/mentee/recommendations'
import Timeline from 'app/layouts/dashboard/timeline'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import getMenteeTimelineItems from 'app/layouts/dashboard/mentee/helpers/get-timeline-items'
import { onSendMessage } from 'vertx'
import { selectDashboard } from 'redux/app/selectors'
import useGetMenteeInformation from 'app/layouts/dashboard/mentee/helpers/get-mentee-information'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const MenteeDashboard = () => {
  const templateColumns = useMobileValue(['1fr', 'minmax(max-content, 575px) 1fr'])

  const {
    isMentorSelected,
    isTrainingCompleted,
    isMeetingCompleted,
    menteeStatus,
  } = useGetMenteeInformation()

  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentor, setCurrentMentor] = useState(null)
  const [showProfileView, setShowProfileView] = useState(false)

  const { items } = getMenteeTimelineItems()

  const dashboardSbes = useSelector(selectDashboard)

  const labelSbes = find(includes('_LABEL'))(dashboardSbes)
  const labelCode = useSelector(selectCode(labelSbes, 'PRI_CODE'))?.value

  const invitedMentorSbes = find(includes('_MENTOR_MNG_INVITED'))(dashboardSbes)
  const invitedMentors = useSelector(selectRows(invitedMentorSbes))
  const invitedMentorsCount = useSelector(selectCode(invitedMentorSbes, 'PRI_TOTAL_RESULTS'))?.value

  const userCode = useSelector(selectCode('USER'))
  const userFirstName = useSelector(selectCode(userCode, 'PRI_FIRSTNAME'))?.value

  const recommendedMentorSbes = find(includes('_SUMMARY_MENTORS'))(dashboardSbes)
  const recommendedMentorCount = useSelector(selectCode(recommendedMentorSbes, 'PRI_TOTAL_RESULTS'))
    ?.value

  const mentoringSessions = useSelector(selectCode(userCode, 'LNK_MENTORING_SESSIONS'))?.value

  const onClick = value => {
    onSendMessage({
      code: value,
      parentCode: 'BTN_CLICK',
      targetCode: userCode,
    })
  }

  return (
    <Grid templateColumns={templateColumns} gap={'3rem'} alignItems={'start'}>
      <Box
        h={'calc(100% + 5rem)'}
        pt={10}
        paddingInline={10}
        mt={-10}
        bg={'gray.50'}
        boxShadow={`0.5rem -2px 1.5rem rgba(0,0,0,0.07)`}
      >
        <Timeline items={items} setShowDetailView={setShowDetailView} />
      </Box>

      <Box mt={useMobileValue(['10', ''])} position="sticky" top="5vh" paddingInline={10}>
        {showProfileView && showDetailView ? (
          <MenteeDetailView
            setShowDetailView={setShowDetailView}
            currentMentee={userCode}
            showProfileView={showProfileView}
          />
        ) : (
          <>
            <Text textStyle={'head.1'} marginBottom={2}>
              {`Welcome, ${userFirstName}`}
            </Text>

            <HStack color={'purple.100'} textStyle={'tail.1'} justifyContent={'space-between'}>
              <Text
                onClick={() => onClick('ACT_GO_TO_PROFILE')}
                cursor={'pointer'}
                _hover={{ color: 'purple.500' }}
              >
                {'EDIT YOUR PROFILE'}
              </Text>
              <Text
                onClick={() => {
                  setShowDetailView(true)
                  setShowProfileView(true)
                }}
                cursor={'pointer'}
                _hover={{ color: 'purple.500' }}
              >
                {'VIEW YOUR PROFILE'}
              </Text>
            </HStack>

            <MenteeStats
              recommendedMentorCount={recommendedMentorCount}
              invitedMentorsCount={invitedMentorsCount}
              mentoringSessions={mentoringSessions}
            />

            <Box display={'flex'} justifyContent={'flex-end'} mt={8}>
              <Link
                href={careerNavigatorLink}
                isExternal
                paddingInline={5}
                paddingBlock={2}
                bg={'orange.700'}
                color={'text.dark'}
                textStyle={'body.1'}
                rounded={32}
                cursor={'pointer'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'orange.600',
                }}
              >
                <FontAwesomeIcon icon={faPlus} color="#fff" />
                <Text as={'span'} ml={2}>
                  {careerNavigatorText}
                </Text>
              </Link>
            </Box>

            <Box w={'full'} h={'1px'} bg={'gray.300'} marginBlock={16}></Box>

            {labelCode && <DashboardMessages labelCode={labelCode} />}

            {equals('INVITED', menteeStatus) && invitedMentors ? (
              <BookedTiming invitedMentors={invitedMentors} menteeStatus={menteeStatus} />
            ) : compose(not, equals('PENDING'))(menteeStatus) &&
              compose(not, equals('TRAINING'))(menteeStatus) &&
              compose(not, equals('AWAITING_SELECT_DATETIME_MENTORING'))(menteeStatus) &&
              compose(not, equals('MENTORING'))(menteeStatus) &&
              compose(not, equals('AVAILABLE'))(menteeStatus) ? (
              <ProvidedTimings labelCode={labelCode} />
            ) : !showDetailView && isMentorSelected && !isMeetingCompleted ? (
              <>
                <Meetings labelCode={labelCode} />
                <ProvidedTimings labelCode={labelCode} />
              </>
            ) : showDetailView && isTrainingCompleted && currentMentor ? (
              <DetailView
                setShowDetailView={setShowDetailView}
                currentMentor={currentMentor}
                showProfileView={showProfileView}
              />
            ) : isTrainingCompleted && !isMentorSelected ? (
              <Recommendation
                setShowDetailView={setShowDetailView}
                setCurrentMentor={setCurrentMentor}
                menteeStatus={menteeStatus}
              />
            ) : isMeetingCompleted ? (
              <AlumniPage />
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
    </Grid>
  )
}
export default MenteeDashboard
