import { Box, HStack, Button, useColorModeValue, useToast, Flex } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'
import {
  personalDetails,
  professionalDetails,
  preference,
} from 'app/layouts/dashboard/timeline/templates/CardContent'
import { onSendMessage } from 'vertx'

const DetailView = ({ setShowDetailView, currentMentor }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const toast = useToast()
  const sendToast = () =>
    toast({
      title: 'Invitation Sent!',
      description: 'We will notify you once the Mentor has accepted your invitation.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
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
      justifyContent="space-around"
      alignItems="center"
    >
      <Box w="95%">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
        >{`Mentor Selection`}</Button>
      </Box>
      <DetailHeader beCode={currentMentor} />
      <HStack w="90%">
        <DetailCards detailsection={personalDetails} currentMentor={currentMentor} miniCard />
        <DetailCards detailsection={professionalDetails} currentMentor={currentMentor} miniCard />
      </HStack>
      <DetailCards detailsection={preference} currentMentor={currentMentor} />
      <Box w="90%">
        <Button
          w="full"
          colorScheme="blue"
          onClick={() => {
            onSendMessage({ code: 'ACT_INVITE_MENTOR', targetCode: currentMentor })
            setShowDetailView(false)
            sendToast()
          }}
        >{`Invite`}</Button>
      </Box>
    </Flex>
  )
}
export default DetailView
