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
  personalDetails,
  preference,
  professionalDetails,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendMessage } from 'vertx'
import { useIsMobile } from 'utils/hooks'

const DetailView = ({ setShowDetailView, currentMentor }) => {
  const isMobile = useIsMobile()
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
      w={isMobile ? '' : '50vw'}
      bg={bg}
      h={isMobile ? 'auto' : '85vh'}
      spacing={4}
      p="5"
      overflowY="auto"
      flexDirection="column"
      alignItems="center"
    >
      <Box mb={4} w="100%">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
          test-id={`BACK_TO_MENTOR_SELECTION`}
        >
          {'Mentor Selection'}
        </Button>
      </Box>

      <DetailHeader beCode={currentMentor} />

      <Grid
        width={'100%'}
        templateColumns={isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))'}
        gap={'1rem'}
        mb={'1rem'}
      >
        <DetailCards detailsection={personalDetails} currentMentor={currentMentor} miniCard />
        <DetailCards detailsection={professionalDetails} currentMentor={currentMentor} miniCard />
      </Grid>
      <Box width="100%" mb={'1rem'}>
        <DetailCards detailsection={preference} currentMentor={currentMentor} />
      </Box>

      <Box w="100%">
        <Button
          w="full"
          colorScheme="blue"
          onClick={() => {
            onSendMessage({ code: 'ACT_INVITE_MENTOR', targetCode: currentMentor })
            setShowDetailView(false)
            sendToast()
          }}
          test-id={`ACT_INVITE_MENTOR`}
        >
          {`Invite`}
        </Button>
      </Box>
    </Flex>
  )
}
export default DetailView
