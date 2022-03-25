import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { faCheckCircle, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import {
  menteeInviteePersonalDetails,
  menteeInviteePreference,
  menteeInviteeProfessionalDetails,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendMessage } from 'vertx'

const DetailView = ({ setShowDetailView, currentMentee }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const toast = useToast()
  const sendToast = () =>
    toast({
      duration: 9000,
      isClosable: true,
      position: 'top-right',
      render: () => (
        <HStack
          paddingBlock={5}
          paddingInline={6}
          bg="success.100"
          borderWidth={'1px'}
          borderColor={'success.500'}
          borderRadius={'lg'}
        >
          <FontAwesomeIcon color="#00AFAB" icon={faCheckCircle} size="lg" />
          <Box>
            <Text variant="head.3" color="text.light">
              {`Invitation Sent!`}
            </Text>
            <Text>{'We will notify you once the Mentor has accepted your invitation.'}</Text>
          </Box>
        </HStack>
      ),
    })
  return (
    <Flex
      w="50vw"
      bg={bg}
      h="85vh"
      spacing={4}
      p="3"
      overflowY="scroll"
      position="sticky"
      top="10vh"
      flexDirection="column"
      // justifyContent="space-around"
      alignItems="center"
    >
      <Box mb={4} w="95%">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
          test-id={`BACK_TO_MENTEE_SELECTION`}
        >{`Mentee Selection`}</Button>
      </Box>

      <DetailHeader beCode={currentMentee} />

      <Grid
        width={'95%'}
        templateColumns={'repeat(auto-fit, minmax(260px, 1fr))'}
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
      <Box width="95%" mb={'1rem'}>
        <DetailCards detailsection={menteeInviteePreference} currentMentee={currentMentee} />
      </Box>

      <Box w="95%">
        <Button
          w="full"
          colorScheme="blue"
          onClick={() => {
            onSendMessage({ code: 'ACT_MENTOR_AGREE_TO_MENTOR', parentCode: currentMentee })
            setShowDetailView(false)
            sendToast()
          }}
          test-id={`ACT_MENTOR_AGREE_TO_MENTOR`}
        >{`Accept Invitation`}</Button>
      </Box>
    </Flex>
  )
}
export default DetailView
