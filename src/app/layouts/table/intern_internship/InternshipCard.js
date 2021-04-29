import { useColorModeValue } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image'
import { Box, Spacer, Text, VStack } from '@chakra-ui/layout'
import useApi from 'api'
import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const InternshipCard = ({ code, parentCode }) => {
  const [name, img, hostCpy] = useSelector(
    selectAttributes(code, ['PRI_NAME', 'PRI_IMAGE_URL', 'PRI_ASSOC_HC']),
  )

  const { getImageSrc } = useApi()
  const src = getImageSrc(img?.value)
  const bgColor = useColorModeValue('white', '')

  return (
    <Box
      shadow="md"
      _hover={{ boxShadow: '2xl' }}
      cursor="pointer"
      borderRadius="lg"
      w="17rem"
      p="3"
      h="18rem"
      background={bgColor}
      onClick={() => onSendMessage({ code: 'ACT_PRI_EVENT_VIEW', targetCode: code, parentCode })}
    >
      <VStack h="full">
        <Spacer />
        <Image src={src} maxW="10rem" maxH="10rem" />
        <Spacer />
        <Text fontWeight="semibold">{hostCpy?.value}</Text>
        <Text>{name?.value}</Text>
      </VStack>
    </Box>
  )
}

export default InternshipCard
