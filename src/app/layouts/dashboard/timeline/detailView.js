import { Box, VStack, Spacer, Image, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import DetailCards from 'app/layouts/dashboard/timeline/templates/DetailCards'
import Attribute from 'app/BE/attribute'
import {
  personalDetails,
  professionalDetails,
  preference,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

const DetailView = ({ setShowDetailView, currentMentor }) => {
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
        <Image src={'PRI_IMAGE_URL'} boxSize="150px" />
        <Spacer />
        <Attribute config={{ textStyle: 'head.2' }} code={currentMentor} attribute="PRI_NAME" />
      </VStack>
      <DetailCards detailsection={personalDetails} currentMentor={currentMentor} />
      <DetailCards detailsection={professionalDetails} currentMentor={currentMentor} />
      <DetailCards detailsection={preference} currentMentor={currentMentor} />

      <Box w="80%">
        <Button w="full" colorScheme="teal">{`Invite`}</Button>
      </Box>
    </VStack>
  )
}

export default DetailView
