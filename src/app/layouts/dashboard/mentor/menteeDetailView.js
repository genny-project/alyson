import { Box, Button, Flex, Grid, useColorModeValue } from '@chakra-ui/react'
import { compose, equals, not } from 'ramda'
import {
  menteeInviteePersonalDetails,
  menteeInviteePreference,
  menteeInviteeProfessionalDetails,
  menteePersonalDetails,
  menteeProfilePreference,
  menteeProfileProfessionalDetails,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const MenteeDetailView = ({ setShowDetailView, currentMentee, showProfileView }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const menteeStatus = useSelector(selectCode(currentMentee, '_LNK_MENTEE__PRI_STATUS'))?.value

  return (
    <Flex
      w="full"
      bg={bg}
      h="85vh"
      spacing={4}
      p="3"
      overflowY="auto"
      flexDirection="column"
      alignItems="center"
    >
      <Box mb={4} w="full">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
          test-id={`BACK_TO_MENTEE_SELECTION`}
        >
          {equals('MATCHED', menteeStatus) || showProfileView ? 'Back' : `Mentee Selection`}
        </Button>
      </Box>

      <DetailHeader beCode={currentMentee} />

      <Grid
        width={'full'}
        templateColumns={'repeat(auto-fit, minmax(260px, 1fr))'}
        gap={'1rem'}
        mb={'1rem'}
      >
        <DetailCards
          detailsection={showProfileView ? menteePersonalDetails : menteeInviteePersonalDetails}
          currentMentee={currentMentee}
          miniCard
        />
        <DetailCards
          detailsection={
            showProfileView ? menteeProfileProfessionalDetails : menteeInviteeProfessionalDetails
          }
          currentMentee={currentMentee}
          miniCard
        />
      </Grid>

      <Box width="full">
        <DetailCards
          detailsection={showProfileView ? menteeProfilePreference : menteeInviteePreference}
          currentMentee={currentMentee}
        />
      </Box>

      {showProfileView ||
        (compose(not, equals('MATCHED'))(menteeStatus) && (
          <Box w="full" mt={'1rem'}>
            <Button
              w="full"
              colorScheme="blue"
              onClick={() => {
                onSendMessage({ code: 'ACT_MENTOR_AGREE_TO_MENTOR', parentCode: currentMentee })
                setShowDetailView(false)
              }}
              test-id={`ACT_MENTOR_AGREE_TO_MENTOR`}
            >
              {`Accept Invitation`}
            </Button>
          </Box>
        ))}
    </Flex>
  )
}
export default MenteeDetailView
