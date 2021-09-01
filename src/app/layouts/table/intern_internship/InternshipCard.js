import { useColorModeValue } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image'
import { Spacer, Text, VStack } from '@chakra-ui/layout'
import useApi from 'api'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { onSendMessage } from 'vertx'

const InternshipCard = ({ code, parentCode }) => {
  const [name, img, hostCpy] = useSelector(
    selectAttributes(code, ['PRI_NAME', 'PRI_IMAGE_URL', 'PRI_ASSOC_HC']),
  )

  const { getImageSrc } = useApi()
  const src = getImageSrc(img?.value)
  const bgColor = useColorModeValue('white', '')

  const isMobile = useIsMobile()

  return (
    <Card
      _hover={{ boxShadow: '2xl' }}
      cursor="pointer"
      w={isMobile ? '40vw' : '19rem'}
      p="4"
      h={'17rem'}
      background={bgColor}
      onClick={() => onSendMessage({ code: 'ACT_PRI_EVENT_VIEW', targetCode: code, parentCode })}
    >
      <VStack h="full">
        <Spacer />
        <Image src={src} maxW={isMobile ? '5rem' : '10rem'} maxH={isMobile ? '5rem' : '10rem'} />
        <Spacer />
        <Text fontWeight="semibold">{hostCpy?.value}</Text>
        <Text textOverflow="ellipsis">{name?.value}</Text>
      </VStack>
    </Card>
  )
}

export default InternshipCard
