import { Box, Button, Flex, Grid, useColorModeValue } from '@chakra-ui/react'
import { equals, not } from 'ramda'
import {
  menteeInviteePersonalDetails,
  menteeInviteePreference,
  menteeInviteeProfessionalDetails,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const DetailView = ({ setShowDetailView, currentMentee }) => {
  const isMobile = useIsMobile()
  const bg = useColorModeValue('gray.100', 'gray.700')
  const menteeStatus = useSelector(selectCode(currentMentee, '_LNK_MENTEE__PRI_STATUS'))?.value

  return (
    <Flex
      w={isMobile ? '' : '50vw'}
      bg={bg}
      h={isMobile ? 'auto' : '85vh'}
      spacing={4}
      p="3"
      overflowY="scroll"
      flexDirection="column"
      alignItems="center"
    >
      <Box mb={4} w="100%">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
          test-id={`BACK_TO_MENTEE_SELECTION`}
        >
          {equals('MATCHED', menteeStatus) ? 'Back' : `Mentee Selection`}
        </Button>
      </Box>

      <DetailHeader beCode={currentMentee} />

      <Grid
        width={'100%'}
        templateColumns={isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))'}
        gap={'1rem'}
        mb={'1rem'}
      >
        <DetailCards
          detailsection={menteeInviteePersonalDetails}
          currentMentee={currentMentee}
          miniCard
        />
        <DetailCards
          detailsection={menteeInviteeProfessionalDetails}
          currentMentee={currentMentee}
          miniCard
        />
      </Grid>

      <Box width="100%" mb={'1rem'}>
        <DetailCards detailsection={menteeInviteePreference} currentMentee={currentMentee} />
      </Box>

      {not(equals('MATCHED', menteeStatus)) && (
        <Box w="100%">
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
      )}
    </Flex>
  )
}
export default DetailView
