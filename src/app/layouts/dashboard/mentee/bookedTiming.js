import { Box, Flex, Grid, Text } from '@chakra-ui/react'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { map } from 'ramda'
import { mentorInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useMobileValue } from 'utils/hooks'

const BookedTiming = ({ invitedMentors, menteeStatus }) => {
  const templateColumns = useMobileValue(['1fr', '70px 1fr 100px'])
  const margin = useMobileValue(['', '10'])

  return (
    <Box position={'sticky'} top={'5vh'}>
      {invitedMentors &&
        map(mentor => (
          <Grid
            templateColumns={templateColumns}
            alignContent={'start'}
            alignItems={'start'}
            gap={'1rem'}
            bg={'white'}
            spacing={4}
            p="5"
            key={mentor}
            mb={5}
          >
            <Box mt={margin}>
              <Attribute
                config={{ w: '70px', h: '70px' }}
                code={mentor}
                attribute="_LNK_MENTOR__PRI_USER_PROFILE_PICTURE"
              />
            </Box>

            <DetailCards
              detailsection={mentorInfo}
              currentMentor={mentor}
              miniCard
              shadow={'none'}
            />

            {!menteeStatus === 'PENDIN_DATE_SELECT' ? (
              <Box
                mt={margin}
                paddingBlock={2}
                paddingInline={3}
                bg={'orange.100'}
                border={'1px'}
                borderRadius={'0.5rem'}
                borderColor={'orange.400'}
                cursor={'pointer'}
              >
                <Flex>
                  <FontAwesomeIcon color={'#fc825c'} icon={faCalendarDay} />
                  <Attribute
                    config={{ ml: '0.5rem' }}
                    code={mentor}
                    attribute={'PRI_MEET_AND_GREET_TIME'}
                  />
                </Flex>
              </Box>
            ) : (
              <Box
                mt={margin}
                paddingBlock={2}
                paddingInline={3}
                bg={'orange.600'}
                color={'text.dark'}
                textAlign={'center'}
                borderRadius={'10rem'}
              >
                <Text>{'Invited'}</Text>
              </Box>
            )}
          </Grid>
        ))(invitedMentors)}
    </Box>
  )
}
export default BookedTiming
