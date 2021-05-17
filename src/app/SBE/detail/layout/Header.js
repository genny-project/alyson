import { Box, Center, VStack } from '@chakra-ui/layout'
import useApi from 'api'
import Attribute from 'app/BE/attribute'
import ProfilePicture from 'app/layouts/components/profile_picture'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const DetailHeader = ({ beCode }) => {
  const { value } = useSelector(selectCode(beCode, 'PRI_IMAGE_URL')) || {}

  const imageSrc = useApi().getImageSrc(value)

  return (
    <Center h="25rem" my="5">
      <VStack spacing={0}>
        <Box w="50%">
          <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
        </Box>
        <Box mb="5rem">
          <ProfilePicture src={imageSrc} />
        </Box>
        <Box>
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
        </Box>
      </VStack>
    </Center>
  )
}

export default DetailHeader
