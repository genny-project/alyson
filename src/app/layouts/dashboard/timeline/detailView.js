import { Box, VStack, Spacer, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import DetailCards from 'app/layouts/dashboard/timeline/templates/DetailCards'
import Attribute from 'app/BE/attribute'
import {
  personalDetails,
  professionalDetails,
  preference,
} from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const DetailView = ({ setShowDetailView, currentMentor }) => {
  const name = useSelector(selectCode(currentMentor, 'PRI_NAME'))?.value
  return (
    <VStack w="50%" bg="gray.100" h="80vh" spacing={10} m={10} p="5" overflowY="scroll">
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
          config={{ size: '2xl', name: name }}
          code={currentMentor}
          attribute="PRI_IMAGE_URL"
        />
        <Spacer />
        <Attribute config={{ textStyle: 'head.2' }} code={currentMentor} attribute="PRI_NAME" />
      </VStack>
      <DetailCards detailsection={personalDetails} currentMentor={currentMentor} />
      <DetailCards detailsection={professionalDetails} currentMentor={currentMentor} />
      <DetailCards detailsection={preference} currentMentor={currentMentor} />

      <Box w="80%">
        <Button
          w="full"
          colorScheme="blue"
          onClick={() => {
            onSendMessage({ code: 'ACT_INVITE_MENTOR', targetCode: currentMentor })
            setShowDetailView(false)
          }}
        >{`Invite`}</Button>
      </Box>
    </VStack>
  )
}

export default DetailView
