import { useSelector } from 'react-redux'
import { Box, VStack, HStack, Spacer, Button, useColorModeValue, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import DetailCards from 'app/layouts/dashboard/timeline/templates/DetailCards'
import Attribute from 'app/BE/attribute'
import {
  personalDetails,
  professionalDetails,
  preference,
} from 'app/layouts/dashboard/timeline/templates/CardContent'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
const DetailView = ({ setShowDetailView, currentMentor }) => {
  const name = useSelector(selectCode(currentMentor, 'PRI_NAME'))?.value
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
    <VStack
      w="50vw"
      bg={bg}
      h="85vh"
      spacing={4}
      p="3"
      overflowY="scroll"
      position="sticky"
      top="10vh"
    >
      <Box w="100%">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
        >{`Mentor Selection`}</Button>
      </Box>
      <VStack>
        <Attribute
          config={{ size: 'xl', name: name }}
          code={currentMentor}
          attribute="PRI_IMAGE_URL"
        />
        <Spacer />
        <Attribute config={{ textStyle: 'head.3' }} code={currentMentor} attribute="PRI_NAME" />
      </VStack>
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
    </VStack>
  )
}
export default DetailView
